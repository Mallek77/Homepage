import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Icon from "../components/Icon";
import { useMissions, Mission } from "../store/MissionsContext";
import styles from "./PlanningEnCours.module.css";

const machines = ["Nissan 30m", "Junior", "37m Tractée"] as const;
const statuts = ["Payé", "En attente", "Annulé"] as const;

const PlanningEnCours: FunctionComponent = () => {
  const navigate = useNavigate();
  const { missions, updateMission, deleteMission } = useMissions();

  const [filter, setFilter] = useState<
    "all" | "Payé" | "En attente" | "Annulé"
  >("all");
  const [filterMachine, setFilterMachine] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Mission | null>(null);

  const filtered = missions.filter((m) => {
    const matchStatut = filter === "all" || m.statutPaiement === filter;
    const matchMachine = filterMachine === "all" || m.machine === filterMachine;
    const matchSearch =
      search === "" ||
      m.nomEntreprise.toLowerCase().includes(search.toLowerCase()) ||
      m.lieu.toLowerCase().includes(search.toLowerCase()) ||
      m.telephone.includes(search);
    return matchStatut && matchMachine && matchSearch;
  });

  const startEdit = (m: Mission) => {
    setEditingId(m.id);
    setEditData({ ...m });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  const saveEdit = () => {
    if (!editData) return;
    updateMission(editData);
    setEditingId(null);
    setEditData(null);
  };

  const statutColor: Record<string, string> = {
    Payé: styles.paye,
    "En attente": styles.attente,
    Annulé: styles.annule,
    "": styles.vide,
  };

  return (
    <AppLayout>
      <div className={styles.page}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.pageTitle}>Planning en cours</h1>
            <span className={styles.count}>
              {missions.length} mission{missions.length > 1 ? "s" : ""}
            </span>
          </div>
          <button
            className={styles.btnAdd}
            onClick={() => navigate("/missions")}
          >
            <Icon name="add" size={18} color="#fff" />
            Nouvelle Mission
          </button>
        </div>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.searchWrap}>
            <Icon name="search" size={18} color="var(--text-muted)" />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Rechercher client, lieu, téléphone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filtre machine */}
          <div className={styles.filterTabs}>
            <button
              className={`${styles.filterTab} ${
                filterMachine === "all" ? styles.filterActive : ""
              }`}
              onClick={() => setFilterMachine("all")}
            >
              Toutes
            </button>
            {machines.map((mac) => (
              <button
                key={mac}
                className={`${styles.filterTab} ${
                  filterMachine === mac ? styles.filterActive : ""
                }`}
                onClick={() => setFilterMachine(mac)}
              >
                {mac}
              </button>
            ))}
          </div>

          {/* Filtre paiement */}
          <div className={styles.filterTabs}>
            <button
              className={`${styles.filterTab} ${
                filter === "all" ? styles.filterActive : ""
              }`}
              onClick={() => setFilter("all")}
            >
              Tout
            </button>
            {statuts.map((s) => (
              <button
                key={s}
                className={`${styles.filterTab} ${
                  filter === s ? styles.filterActive : ""
                }`}
                onClick={() => setFilter(s as any)}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            className={styles.btnCalendar}
            onClick={() => navigate("/planning")}
          >
            <Icon name="calendar" size={16} color="var(--text-secondary)" />
            Calendrier
          </button>
        </div>

        {/* Table */}
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Heure</th>
                <th>Machine</th>
                <th>Entreprise</th>
                <th>Téléphone</th>
                <th>Email</th>
                <th>Lieu</th>
                <th>Paiement</th>
                <th>Prix (€)</th>
                <th>Remarque</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={11} className={styles.empty}>
                    Aucune mission trouvée
                  </td>
                </tr>
              )}
              {filtered.map((m) =>
                editingId === m.id && editData ? (
                  <tr key={m.id} className={styles.editRow}>
                    <td>
                      <input
                        className={styles.cellInput}
                        type="date"
                        value={editData.date}
                        onChange={(e) =>
                          setEditData({ ...editData, date: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        className={styles.cellInput}
                        type="text"
                        value={editData.heure}
                        onChange={(e) =>
                          setEditData({ ...editData, heure: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <select
                        className={styles.cellInput}
                        value={editData.machine}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            machine: e.target.value as Mission["machine"],
                          })
                        }
                      >
                        {machines.map((mac) => (
                          <option key={mac}>{mac}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        className={styles.cellInput}
                        type="text"
                        value={editData.nomEntreprise}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            nomEntreprise: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        className={styles.cellInput}
                        type="text"
                        value={editData.telephone}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            telephone: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <input
                        className={styles.cellInput}
                        type="email"
                        value={editData.email}
                        onChange={(e) =>
                          setEditData({ ...editData, email: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        className={styles.cellInput}
                        type="text"
                        value={editData.lieu}
                        onChange={(e) =>
                          setEditData({ ...editData, lieu: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <select
                        className={styles.cellInput}
                        value={editData.statutPaiement}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            statutPaiement: e.target
                              .value as Mission["statutPaiement"],
                          })
                        }
                      >
                        <option value="">—</option>
                        {statuts.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        className={styles.cellInput}
                        type="number"
                        value={editData.prix}
                        onChange={(e) =>
                          setEditData({ ...editData, prix: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        className={styles.cellInput}
                        type="text"
                        value={editData.remarque}
                        onChange={(e) =>
                          setEditData({ ...editData, remarque: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={`${styles.actionBtn} ${styles.saveBtn}`}
                          onClick={saveEdit}
                        >
                          <Icon name="save" size={15} />
                        </button>
                        <button
                          className={styles.actionBtn}
                          onClick={cancelEdit}
                        >
                          <Icon name="close" size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={m.id}>
                    <td className={styles.dateCell}>{m.date}</td>
                    <td>{m.heure || "—"}</td>
                    <td>
                      <span className={styles.machineBadge}>{m.machine}</span>
                    </td>
                    <td>
                      {m.nomEntreprise || (
                        <span className={styles.empty2}>—</span>
                      )}
                    </td>
                    <td>
                      {m.telephone || <span className={styles.empty2}>—</span>}
                    </td>
                    <td className={styles.emailCell}>
                      {m.email || <span className={styles.empty2}>—</span>}
                    </td>
                    <td>
                      {m.lieu || <span className={styles.empty2}>—</span>}
                    </td>
                    <td>
                      {m.statutPaiement ? (
                        <span
                          className={`${styles.badge} ${
                            statutColor[m.statutPaiement]
                          }`}
                        >
                          {m.statutPaiement}
                        </span>
                      ) : (
                        <span className={styles.empty2}>—</span>
                      )}
                    </td>
                    <td className={styles.prixCell}>
                      {m.prix ? (
                        `${m.prix} €`
                      ) : (
                        <span className={styles.empty2}>—</span>
                      )}
                    </td>
                    <td className={styles.remarqueCell}>
                      {m.remarque || <span className={styles.empty2}>—</span>}
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={styles.actionBtn}
                          onClick={() => startEdit(m)}
                          title="Modifier"
                        >
                          <Icon name="edit" size={15} />
                        </button>
                        <button
                          className={`${styles.actionBtn} ${styles.deleteBtn}`}
                          onClick={() => deleteMission(m.id)}
                          title="Supprimer"
                        >
                          <Icon name="delete" size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <span className={styles.paginInfo}>
            Affichage {filtered.length} sur {missions.length}
          </span>
        </div>
      </div>
    </AppLayout>
  );
};

export default PlanningEnCours;
