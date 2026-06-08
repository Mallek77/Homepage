import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Icon from "../components/Icon";
import { useMissions } from "../store/MissionsContext";
import styles from "./AccessDirect.module.css";

const MACHINES = ["Nissan 30m", "Junior", "37m Tractée"];

const MACHINE_COLOR: Record<string, { bg: string; color: string; border: string }> = {
  "Nissan 30m": { bg: "rgba(91,141,238,0.1)", color: "#2a4fa3", border: "#5b8dee" },
  Junior: { bg: "rgba(42,157,143,0.1)", color: "#1a6a60", border: "#2a9d8f" },
  "37m Tractée": { bg: "rgba(233,162,39,0.1)", color: "#7a4a00", border: "#e9a227" },
};

const now = new Date();
const moisCourant = now.getMonth();
const anneeCourante = now.getFullYear();

const MOIS_NOMS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

function joursOuvrablesDuMois(annee: number, mois: number) {
  let count = 0;
  const d = new Date(annee, mois, 1);
  while (d.getMonth() === mois) {
    if (d.getDay() !== 0) count++;
    d.setDate(d.getDate() + 1);
  }
  return count;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "—";
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  const d = new Date(dateStr);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

const statutLabel: Record<string, string> = {
  active: "Confirmée",
  pending: "En attente",
  completed: "Terminée",
};

const statutColor: Record<string, string> = {
  active: "#2a9d8f",
  pending: "#e9a227",
  completed: "#6dbc8d",
};

function Donut({ pct, color, size = 120 }: { pct: number; color: string; size?: number }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <circle cx="50" cy="50" r={r} fill="none" stroke="#edf0f5" strokeWidth="14" />
      <circle
        cx="50" cy="50" r={r} fill="none"
        stroke={color} strokeWidth="14"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 50 50)"
      />
    </svg>
  );
}

const AccessDirect: FunctionComponent = () => {
  const navigate = useNavigate();
  const { missions } = useMissions();

  const missionsMois = missions.filter((m) => {
    if (!m.date) return false;
    const parts = m.date.split("-");
    if (parts.length === 3) {
      return parseInt(parts[0]) === anneeCourante && parseInt(parts[1]) - 1 === moisCourant;
    }
    const d = new Date(m.date);
    return d.getFullYear() === anneeCourante && d.getMonth() === moisCourant;
  });

  const joursOuvrables = joursOuvrablesDuMois(anneeCourante, moisCourant);
  const capaciteTotale = MACHINES.length * joursOuvrables;
  const remplissagePct = Math.round((missionsMois.length / capaciteTotale) * 100);

  const totalConfirmees = missionsMois.filter((m) => m.statut === "active").length;
  const totalAttente = missionsMois.filter((m) => m.statut === "pending").length;

  const caTotal = missionsMois.reduce((s, m) => s + Number(m.prix || 0), 0);
  const caEncaisse = missionsMois
    .filter((m) => m.statutPaiement === "Payé")
    .reduce((s, m) => s + Number(m.prix || 0), 0);
  const caAttenteVal = missionsMois
    .filter((m) => m.statutPaiement !== "Payé")
    .reduce((s, m) => s + Number(m.prix || 0), 0);

  const missionParMachine = MACHINES.map((mac) => ({
    mac,
    count: missionsMois.filter((m) => m.machine === mac).length,
    pct: Math.round(
      (missionsMois.filter((m) => m.machine === mac).length / joursOuvrables) * 100
    ),
  }));

  // ✅ Futures en premier (ordre croissant), passées ensuite (ordre décroissant)
  const todayStr = now.toISOString().split("T")[0];

  const dernieresMissions = [...missions]
    .filter((m) => m.date)
    .sort((a, b) => {
      const aFuture = a.date >= todayStr;
      const bFuture = b.date >= todayStr;
      if (aFuture && bFuture) return a.date.localeCompare(b.date);
      if (!aFuture && !bFuture) return b.date.localeCompare(a.date);
      return aFuture ? -1 : 1;
    })
    .slice(0, 4);

  return (
    <AppLayout>
      <div className={styles.page}>
        {/* ── Bandeau bienvenue ── */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.heroSub}>
              Tableau de bord — {MOIS_NOMS[moisCourant]} {anneeCourante}
            </p>
            <h1 className={styles.heroTitle}>Azur Levage</h1>
            <p className={styles.heroDesc}>
              Gestion des 3 machines · Monte-charges industriels
            </p>
            <div className={styles.heroActions}>
              <button className={styles.btnPrimary} onClick={() => navigate("/planning")}>
                <Icon name="calendar" size={17} color="#fff" />
                Voir le planning
              </button>
              <button className={styles.btnSecondary} onClick={() => navigate("/missions")}>
                <Icon name="add-task" size={17} color="#1e2d45" />
                Nouvelle mission
              </button>
            </div>
          </div>
          <div className={styles.heroDecor}>
            <div className={styles.decorCircle1} />
            <div className={styles.decorCircle2} />
            <Icon name="construction" size={110} color="rgba(201,162,39,0.13)" style={{ position: "absolute" }} />
          </div>
        </div>

        {/* ── Stats du mois ── */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: "rgba(42,157,143,0.12)" }}>
              <Icon name="task-alt" size={22} color="#2a9d8f" />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{missionsMois.length}</span>
              <span className={styles.statLabel}>Missions ce mois</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: "rgba(42,157,143,0.12)" }}>
              <Icon name="check-circle" size={22} color="#2a9d8f" />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{totalConfirmees}</span>
              <span className={styles.statLabel}>Confirmées</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: "rgba(233,162,39,0.12)" }}>
              <Icon name="hourglass" size={22} color="#e9a227" />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>{totalAttente}</span>
              <span className={styles.statLabel}>En attente</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: "rgba(109,188,141,0.12)" }}>
              <Icon name="payments" size={22} color="#6dbc8d" />
            </div>
            <div className={styles.statInfo}>
              <span className={styles.statValue}>
                {caTotal.toLocaleString("fr-FR")} €
              </span>
              <span className={styles.statLabel}>CA du mois</span>
            </div>
          </div>
        </div>

        {/* ── Panneau principal ── */}
        <div className={styles.panels}>
          {/* Remplissage planning */}
          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>Remplissage du mois</h3>
            <div className={styles.donutWrap}>
              <div className={styles.donut}>
                <Donut
                  pct={remplissagePct}
                  color={
                    remplissagePct > 75 ? "#e9a227"
                    : remplissagePct > 40 ? "#2a9d8f"
                    : "#5b8dee"
                  }
                  size={130}
                />
                <div className={styles.donutCenter}>
                  <span className={styles.donutNum}>{remplissagePct}%</span>
                  <span className={styles.donutSub}>planifié</span>
                </div>
              </div>
              <div className={styles.donutLegend}>
                <div className={styles.donutStat}>
                  <span className={styles.donutStatVal}>{missionsMois.length}</span>
                  <span className={styles.donutStatLab}>missions</span>
                </div>
                <div className={styles.donutSep} />
                <div className={styles.donutStat}>
                  <span className={styles.donutStatVal}>{capaciteTotale}</span>
                  <span className={styles.donutStatLab}>créneaux dispo</span>
                </div>
              </div>
              <p className={styles.donutNote}>
                {remplissagePct < 30 && "📅 Planning peu chargé ce mois-ci"}
                {remplissagePct >= 30 && remplissagePct < 70 && "✅ Planning en bonne progression"}
                {remplissagePct >= 70 && "🔥 Planning bien rempli !"}
              </p>
            </div>
          </div>

          {/* Tableau dernières missions */}
          <div className={`${styles.panel} ${styles.panelWide}`}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>Prochaines missions</h3>
              <button className={styles.viewAll} onClick={() => navigate("/planning-en-cours")}>
                Voir tout <Icon name="arrow-forward" size={14} color="#2a9d8f" />
              </button>
            </div>
            {dernieresMissions.length === 0 ? (
              <p style={{ color: "#8fa0b4", fontSize: 14, textAlign: "center", padding: "24px 0" }}>
                Aucune mission enregistrée
              </p>
            ) : (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Machine</th>
                      <th className={styles.hideOnMobile}>Lieu</th>
                      <th>Statut</th>
                      <th className={styles.hideOnMobile}>Prix</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dernieresMissions.map((m) => (
                      <tr key={m.id}>
                        <td className={styles.dateCell}>{formatDate(m.date)}</td>
                        <td>
                          <span
                            className={styles.macBadge}
                            style={{
                              background: MACHINE_COLOR[m.machine]?.bg ?? "rgba(150,150,150,0.1)",
                              color: MACHINE_COLOR[m.machine]?.color ?? "#555",
                              borderLeft: `3px solid ${MACHINE_COLOR[m.machine]?.border ?? "#888"}`,
                            }}
                          >
                            {m.machine}
                          </span>
                        </td>
                        <td className={styles.hideOnMobile}>{m.lieu || "—"}</td>
                        <td>
                          <span
                            className={styles.badge}
                            style={{
                              background: `${statutColor[m.statut] ?? "#888"}20`,
                              color: statutColor[m.statut] ?? "#888",
                            }}
                          >
                            {statutLabel[m.statut] ?? m.statut}
                          </span>
                        </td>
                        <td className={`${styles.prixCell} ${styles.hideOnMobile}`}>
                          {m.prix ? `${Number(m.prix).toLocaleString("fr-FR")} €` : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Machines */}
          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>Machines ce mois</h3>
            <div className={styles.machineList}>
              {missionParMachine.map(({ mac, count, pct }) => {
                const col = MACHINE_COLOR[mac];
                return (
                  <div key={mac} className={styles.machineItem}>
                    <div className={styles.machineRow}>
                      <span className={styles.machineName}>{mac}</span>
                      <span className={styles.machineCount}>
                        {count} mission{count > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${Math.min(pct, 100)}%`, background: col.border }}
                      />
                    </div>
                    <span className={styles.machinePct}>{pct}% de taux d'utilisation</span>
                  </div>
                );
              })}
            </div>
            <div className={styles.paiementBox}>
              <div className={styles.paiementRow}>
                <span>Encaissé</span>
                <strong style={{ color: "#2a9d8f" }}>{caEncaisse.toLocaleString("fr-FR")} €</strong>
              </div>
              <div className={styles.paiementRow}>
                <span>En attente</span>
                <strong style={{ color: "#e9a227" }}>{caAttenteVal.toLocaleString("fr-FR")} €</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AccessDirect;
