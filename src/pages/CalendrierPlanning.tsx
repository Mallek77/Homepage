import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Icon from "../components/Icon";
import { useMissions, Mission } from "../store/MissionsContext";
import styles from "./CalendrierPlanning.module.css";

const MOIS_NOMS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

const JOURS_COURTS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

const MACHINE_COLOR: Record<
  string,
  { bg: string; border: string; text: string; dark: string }
> = {
  "Nissan 30m": { bg: "rgba(91,141,238,0.15)", border: "#5b8dee", text: "#5b8dee", dark: "#3a6abf" },
  Junior: { bg: "rgba(42,157,143,0.15)", border: "#2a9d8f", text: "#2ddec8", dark: "#1e7a6e" },
  "37m Tractée": { bg: "rgba(233,162,39,0.15)", border: "#e9a227", text: "#f5c55a", dark: "#c07800" },
};

const STATUT_COLOR: Record<string, string> = {
  active: "#2a9d8f", pending: "#e9a227", completed: "#6dbc8d",
};

const STATUT_LABEL: Record<string, string> = {
  active: "Confirmée", pending: "En attente", completed: "Terminée",
};

const PAIEMENT_COLOR: Record<string, { bg: string; text: string }> = {
  Payé: { bg: "rgba(109,188,141,0.22)", text: "#6dbc8d" },
  "En attente": { bg: "rgba(233,162,39,0.22)", text: "#f5c55a" },
  Annulé: { bg: "rgba(224,82,82,0.22)", text: "#e05252" },
};

function toYMD(d: Date) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function getMonday(d: Date) {
  const r = new Date(d);
  const day = r.getDay();
  r.setDate(r.getDate() - (day === 0 ? 6 : day - 1));
  r.setHours(0, 0, 0, 0);
  return r;
}

function formatDate(d: Date) {
  return `${JOURS_COURTS[d.getDay()]} ${d.getDate()} ${MOIS_NOMS[d.getMonth()]}`;
}

const CalendrierPlanning: FunctionComponent = () => {
  const navigate = useNavigate();
  const { missions } = useMissions();
  const todayYMD = toYMD(new Date());

  const [view, setView] = useState<"semaine" | "mois" | "tout">("semaine");
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));
  const [monthDate, setMonthDate] = useState(() => {
    const d = new Date(); d.setDate(1); return d;
  });
  const [filterMachine, setFilterMachine] = useState("Toutes");
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  // Générer les 7 jours de la semaine pour la vue semaine
  const semaineJours = Array.from({ length: 7 }, (_, i) => toYMD(addDays(weekStart, i)));

  const missionsFiltrees = missions
    .filter((m) => filterMachine === "Toutes" || m.machine === filterMachine)
    .filter((m) => {
      if (view === "tout") return true;
      if (view === "semaine") {
        const endWeek = toYMD(addDays(weekStart, 6));
        return m.date >= toYMD(weekStart) && m.date <= endWeek;
      }
      const y = monthDate.getFullYear(), mo = monthDate.getMonth();
      const d = new Date(m.date);
      return d.getFullYear() === y && d.getMonth() === mo;
    })
    .sort((a, b) => a.date.localeCompare(b.date) || a.heure.localeCompare(b.heure));

  const parDate: Record<string, Mission[]> = {};
  missionsFiltrees.forEach((m) => {
    if (!parDate[m.date]) parDate[m.date] = [];
    parDate[m.date].push(m);
  });

  // Pour vue mois/tout : seulement les dates avec missions
  // Pour vue semaine : toujours les 7 jours
  const dates = view === "semaine"
    ? semaineJours
    : Object.keys(parDate).sort();

  const isWeekPast = weekStart < getMonday(new Date());

  const prevWeek = () => setWeekStart((d) => addDays(d, -7));
  const nextWeek = () => setWeekStart((d) => addDays(d, 7));
  const goToday = () => setWeekStart(getMonday(new Date()));
  const prevMonth = () => setMonthDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setMonthDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  const goTodayMonth = () => setMonthDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1));

  const labelPeriode =
    view === "semaine"
      ? (() => {
          const end = addDays(weekStart, 6);
          return `${weekStart.getDate()} – ${end.getDate()} ${MOIS_NOMS[end.getMonth()]} ${end.getFullYear()}`;
        })()
      : view === "mois"
      ? `${MOIS_NOMS[monthDate.getMonth()]} ${monthDate.getFullYear()}`
      : "Toutes les missions";

  const showEmpty = view !== "semaine" && dates.length === 0;

  return (
    <AppLayout>
      <div className={styles.page}>
        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.pageTitle}>Planning</h1>
            <span className={styles.periodLabel}>{labelPeriode}</span>
          </div>
          <div className={styles.headerRight}>
            {view !== "tout" && (
              <div className={styles.navRow}>
                <button className={styles.navBtn} onClick={view === "semaine" ? prevWeek : prevMonth}>
                  <Icon name="chevron-left" size={18} />
                </button>
                <button className={styles.todayBtn} onClick={view === "semaine" ? goToday : goTodayMonth}>
                  Aujourd'hui
                </button>
                <button className={styles.navBtn} onClick={view === "semaine" ? nextWeek : nextMonth}>
                  <Icon name="chevron-right" size={18} />
                </button>
              </div>
            )}
            <div className={styles.viewToggle}>
              {(["semaine", "mois", "tout"] as const).map((v) => (
                <button
                  key={v}
                  className={`${styles.viewBtn} ${view === v ? styles.viewActive : ""}`}
                  onClick={() => setView(v)}
                >
                  {v === "semaine" ? "Semaine" : v === "mois" ? "Mois" : "Tout"}
                </button>
              ))}
            </div>
            <div className={styles.machineFilter}>
              {["Toutes", "Nissan 30m", "Junior", "37m Tractée"].map((mac) => (
                <button
                  key={mac}
                  className={`${styles.macBtn} ${filterMachine === mac ? styles.macBtnActive : ""}`}
                  style={
                    filterMachine === mac && mac !== "Toutes"
                      ? { background: MACHINE_COLOR[mac]?.border, color: "#fff", borderColor: MACHINE_COLOR[mac]?.border }
                      : {}
                  }
                  onClick={() => setFilterMachine(mac)}
                >
                  {mac}
                </button>
              ))}
            </div>
            <button
              className={`${styles.btnAdd} ${isWeekPast && view === "semaine" ? styles.btnDisabled : ""}`}
              disabled={isWeekPast && view === "semaine"}
              onClick={() => navigate("/missions")}
            >
              <Icon name="add" size={17} color="#fff" />
              <span className={styles.btnAddLabel}>Nouvelle mission</span>
            </button>
          </div>
        </div>

        {/* ── Banner passé ── */}
        {isWeekPast && view === "semaine" && (
          <div className={styles.pastBanner}>
            <Icon name="history" size={15} color="#8fa0b4" />
            Semaine passée — consultation uniquement
          </div>
        )}

        {/* ── Contenu vide (mois/tout seulement) ── */}
        {showEmpty ? (
          <div className={styles.empty}>
            <Icon name="calendar" size={40} color="#4a5a6e" />
            <p>Aucune mission sur cette période</p>
            {!isWeekPast && (
              <button className={styles.btnAdd} onClick={() => navigate("/missions")}>
                <Icon name="add" size={16} color="#fff" /> Ajouter une mission
              </button>
            )}
          </div>
        ) : (
          <div className={styles.groupList}>
            {dates.map((date) => {
              const d = new Date(date);
              const isToday = date === todayYMD;
              const isPast = date < todayYMD;
              const dayMissions = parDate[date] || [];
              return (
                <div key={date} className={styles.dayGroup}>
                  {/* ── En-tête du jour ── */}
                  <div className={`${styles.dayBanner} ${isToday ? styles.dayBannerToday : ""} ${isPast ? styles.dayBannerPast : ""}`}>
                    <div className={styles.dayBannerLeft}>
                      <span className={`${styles.dayCircle} ${isToday ? styles.dayCircleToday : ""}`}>
                        {d.getDate()}
                      </span>
                      <div>
                        <span className={styles.dayName}>{formatDate(d)}</span>
                        {isToday && <span className={styles.todayTag}>Aujourd'hui</span>}
                        {isPast && !isToday && <span className={styles.pastTag}>Passé</span>}
                      </div>
                    </div>
                    <div className={styles.dayBannerRight}>
                      <span className={styles.dayCount}>
                        {dayMissions.length > 0
                          ? `${dayMissions.length} mission${dayMissions.length > 1 ? "s" : ""}`
                          : "Libre"}
                      </span>
                      {!isPast && (
                        <button className={styles.addDayBtn} onClick={() => navigate("/missions")}>
                          <Icon name="add" size={14} color="#2a9d8f" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* ── Jour vide ── */}
                  {dayMissions.length === 0 && (
                    <div className={styles.dayEmpty}>
                      <span>Aucune mission</span>
                    </div>
                  )}

                  {/* ── MOBILE : cartes compactes ── */}
                  {dayMissions.length > 0 && (
                    <div className={styles.cardList}>
                      {dayMissions.map((m) => {
                        const col = MACHINE_COLOR[m.machine];
                        const pai = m.statutPaiement ? PAIEMENT_COLOR[m.statutPaiement] : null;
                        return (
                          <div
                            key={m.id}
                            className={`${styles.card} ${isPast ? styles.cardPast : ""}`}
                            onClick={() => setSelectedMission(m)}
                            style={{ borderLeft: `4px solid ${col.border}` }}
                          >
                            <div className={styles.cardTop}>
                              <div className={styles.cardLeft}>
                                <span className={styles.cardHeure}>{m.heure}</span>
                                <span className={styles.cardMachine} style={{ color: col.text, background: col.bg }}>
                                  {m.machine}
                                </span>
                              </div>
                              <div className={styles.cardRight}>
                                {pai && (
                                  <span className={styles.cardPaie} style={{ background: pai.bg, color: pai.text }}>
                                    {m.statutPaiement}
                                  </span>
                                )}
                                <span className={styles.cardStatut} style={{ background: `${STATUT_COLOR[m.statut]}22`, color: STATUT_COLOR[m.statut] }}>
                                  {STATUT_LABEL[m.statut]}
                                </span>
                              </div>
                            </div>
                            <div className={styles.cardBottom}>
                              <span className={styles.cardEntreprise}>
                                {m.nomEntreprise || <span className={styles.cardDash}>—</span>}
                              </span>
                              {m.lieu && (
                                <span className={styles.cardLieu}>
                                  <Icon name="place" size={12} color="#8fa0b4" />
                                  {m.lieu}
                                </span>
                              )}
                              {m.prix && <span className={styles.cardPrix}>{m.prix} €</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* ── DESKTOP : tableau ── */}
                  {dayMissions.length > 0 && (
                    <div className={styles.tableWrap}>
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th>Heure</th><th>Machine</th><th>Entreprise</th>
                            <th>Lieu</th><th>Paiement</th><th>Statut</th>
                            <th>Prix</th><th>Remarque</th><th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {dayMissions.map((m) => {
                            const col = MACHINE_COLOR[m.machine];
                            const pai = m.statutPaiement ? PAIEMENT_COLOR[m.statutPaiement] : null;
                            return (
                              <tr key={m.id} className={isPast ? styles.rowPast : ""} onClick={() => setSelectedMission(m)}>
                                <td className={styles.heureCell}>{m.heure}</td>
                                <td>
                                  <span className={styles.macBadge} style={{ color: col.text, background: col.bg, borderLeft: `3px solid ${col.border}` }}>
                                    {m.machine}
                                  </span>
                                </td>
                                <td>{m.nomEntreprise || <span className={styles.dash}>—</span>}</td>
                                <td>{m.lieu || <span className={styles.dash}>—</span>}</td>
                                <td>
                                  {pai ? (
                                    <span className={styles.paieBadge} style={{ background: pai.bg, color: pai.text }}>
                                      {m.statutPaiement}
                                    </span>
                                  ) : <span className={styles.dash}>—</span>}
                                </td>
                                <td>
                                  <span className={styles.statBadge} style={{ background: `${STATUT_COLOR[m.statut]}22`, color: STATUT_COLOR[m.statut] }}>
                                    {STATUT_LABEL[m.statut]}
                                  </span>
                                </td>
                                <td className={styles.prixCell}>
                                  {m.prix ? `${m.prix} €` : <span className={styles.dash}>—</span>}
                                </td>
                                <td className={styles.remarqueCell}>
                                  {m.remarque || <span className={styles.dash}>—</span>}
                                </td>
                                <td>
                                  <button className={styles.detailBtn} onClick={(e) => { e.stopPropagation(); setSelectedMission(m); }}>
                                    <Icon name="visibility" size={15} color="#8fa0b4" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Modal détail ── */}
        {selectedMission && (
          <div className={styles.overlay} onClick={() => setSelectedMission(null)}>
            <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
              <div className={styles.panelHeader} style={{ borderLeft: `4px solid ${MACHINE_COLOR[selectedMission.machine].border}` }}>
                <div>
                  <span className={styles.panelId}>{selectedMission.id}</span>
                  <h3 className={styles.panelMachine}>{selectedMission.machine}</h3>
                </div>
                <button className={styles.closeBtn} onClick={() => setSelectedMission(null)}>
                  <Icon name="close" size={20} color="#aab4c4" />
                </button>
              </div>
              <div className={styles.panelBody}>
                <div className={styles.panelRow}>
                  <Icon name="calendar-today" size={16} color="#5b8dee" />
                  <span>{selectedMission.date} à {selectedMission.heure}</span>
                </div>
                {selectedMission.nomEntreprise && (
                  <div className={styles.panelRow}>
                    <Icon name="person" size={16} color="#5b8dee" />
                    <span>{selectedMission.nomEntreprise}</span>
                  </div>
                )}
                {selectedMission.lieu && (
                  <div className={styles.panelRow}>
                    <Icon name="place" size={16} color="#5b8dee" />
                    <span>{selectedMission.lieu}</span>
                  </div>
                )}
                {selectedMission.telephone && (
                  <div className={styles.panelRow}>
                    <Icon name="phone" size={16} color="#5b8dee" />
                    <span>{selectedMission.telephone}</span>
                  </div>
                )}
                {selectedMission.email && (
                  <div className={styles.panelRow}>
                    <Icon name="email" size={16} color="#5b8dee" />
                    <span>{selectedMission.email}</span>
                  </div>
                )}
                {selectedMission.prix && (
                  <div className={styles.panelRow}>
                    <Icon name="payments" size={16} color="#5b8dee" />
                    <span className={styles.panelPrix}>{selectedMission.prix} €</span>
                  </div>
                )}
                {selectedMission.remarque && (
                  <div className={styles.panelRow}>
                    <Icon name="notes" size={16} color="#5b8dee" />
                    <span className={styles.panelRemarque}>{selectedMission.remarque}</span>
                  </div>
                )}
                <div className={styles.panelBadges}>
                  <span className={styles.panelBadge} style={{ background: `${STATUT_COLOR[selectedMission.statut]}22`, color: STATUT_COLOR[selectedMission.statut] }}>
                    {STATUT_LABEL[selectedMission.statut]}
                  </span>
                  {selectedMission.statutPaiement && PAIEMENT_COLOR[selectedMission.statutPaiement] && (
                    <span className={styles.panelBadge} style={{ background: PAIEMENT_COLOR[selectedMission.statutPaiement].bg, color: PAIEMENT_COLOR[selectedMission.statutPaiement].text }}>
                      {selectedMission.statutPaiement}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.panelFooter}>
                <button className={styles.editBtn} onClick={() => navigate("/missions")}>
                  <Icon name="edit" size={15} color="#fff" /> Modifier
                </button>
                <button className={styles.closeTextBtn} onClick={() => setSelectedMission(null)}>
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CalendrierPlanning;
