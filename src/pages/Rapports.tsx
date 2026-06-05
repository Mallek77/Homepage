import { FunctionComponent } from "react";
import AppLayout from "../components/AppLayout";
import Icon from "../components/Icon";
import { useMissions } from "../store/MissionsContext";
import styles from "./Rapports.module.css";

const MOIS_NOMS = [
  "Jan",
  "Fév",
  "Mar",
  "Avr",
  "Mai",
  "Jun",
  "Jul",
  "Aoû",
  "Sep",
  "Oct",
  "Nov",
  "Déc",
];
const now = new Date();

const MACHINES = ["Nissan 30m", "Junior", "37m Tractée"];
const MACHINE_COLOR: Record<string, string> = {
  "Nissan 30m": "#5b8dee",
  Junior: "#2a9d8f",
  "37m Tractée": "#e9a227",
};

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

const Rapports: FunctionComponent = () => {
  const { missions } = useMissions();

  const caTotal = missions.reduce((s, m) => s + Number(m.prix || 0), 0);
  const caEncaisse = missions
    .filter((m) => m.statutPaiement === "Payé")
    .reduce((s, m) => s + Number(m.prix || 0), 0);
  const caAttente = missions
    .filter((m) => m.statutPaiement !== "Payé")
    .reduce((s, m) => s + Number(m.prix || 0), 0);

  const nbTerminees = missions.filter((m) => m.statut === "completed").length;
  const nbEnCours = missions.filter((m) => m.statut === "active").length;
  const nbAttente = missions.filter((m) => m.statut === "pending").length;

  const parMachine = MACHINES.map((mac) => ({
    mac,
    count: missions.filter((m) => m.machine === mac).length,
    ca: missions
      .filter((m) => m.machine === mac)
      .reduce((s, m) => s + Number(m.prix || 0), 0),
  }));

  const maxCA = Math.max(...parMachine.map((m) => m.ca), 1);

  return (
    <AppLayout>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>Rapports</h1>
          <span className={styles.period}>
            {MOIS_NOMS[now.getMonth()]} {now.getFullYear()}
          </span>
        </div>

        {/* KPIs */}
        <div className={styles.kpiRow}>
          <div className={styles.kpiCard}>
            <Icon name="payments" size={20} color="#2a9d8f" />
            <div className={styles.kpiInfo}>
              <span className={styles.kpiVal}>
                {caTotal.toLocaleString("fr-FR")} €
              </span>
              <span className={styles.kpiLab}>Chiffre d'affaires</span>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <Icon name="check-circle" size={20} color="#6dbc8d" />
            <div className={styles.kpiInfo}>
              <span className={styles.kpiVal} style={{ color: "#2d7a4e" }}>
                {caEncaisse.toLocaleString("fr-FR")} €
              </span>
              <span className={styles.kpiLab}>Encaissé</span>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <Icon name="hourglass" size={20} color="#e9a227" />
            <div className={styles.kpiInfo}>
              <span className={styles.kpiVal} style={{ color: "#8a5a00" }}>
                {caAttente.toLocaleString("fr-FR")} €
              </span>
              <span className={styles.kpiLab}>En attente de paiement</span>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <Icon name="assignment" size={20} color="#5b8dee" />
            <div className={styles.kpiInfo}>
              <span className={styles.kpiVal}>{missions.length}</span>
              <span className={styles.kpiLab}>Missions totales</span>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <Icon name="task-alt" size={20} color="#6dbc8d" />
            <div className={styles.kpiInfo}>
              <span className={styles.kpiVal}>{nbTerminees}</span>
              <span className={styles.kpiLab}>Terminées</span>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <Icon name="construction" size={20} color="#2a9d8f" />
            <div className={styles.kpiInfo}>
              <span className={styles.kpiVal}>{nbEnCours}</span>
              <span className={styles.kpiLab}>En cours</span>
            </div>
          </div>
        </div>

        <div className={styles.panels}>
          {/* CA par machine */}
          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>CA par machine</h3>
            <div className={styles.barChart}>
              {parMachine.map(({ mac, ca }) => (
                <div key={mac} className={styles.barItem}>
                  <div className={styles.barLabel}>{mac}</div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{
                        width: `${(ca / maxCA) * 100}%`,
                        background: MACHINE_COLOR[mac],
                      }}
                    />
                  </div>
                  <div className={styles.barVal}>
                    {ca.toLocaleString("fr-FR")} €
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.machineMissions}>
              {parMachine.map(({ mac, count }) => (
                <div key={mac} className={styles.machineMissionRow}>
                  <span
                    className={styles.machineDot}
                    style={{ background: MACHINE_COLOR[mac] }}
                  />
                  <span className={styles.machineMac}>{mac}</span>
                  <span className={styles.machineCount}>
                    {count} mission{count > 1 ? "s" : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Répartition statuts */}
          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>Répartition des statuts</h3>
            <div className={styles.statutList}>
              {[
                { key: "completed", label: "Terminées", count: nbTerminees },
                { key: "active", label: "Confirmées", count: nbEnCours },
                { key: "pending", label: "En attente", count: nbAttente },
              ].map(({ key, label, count }) => {
                const pct =
                  missions.length > 0
                    ? Math.round((count / missions.length) * 100)
                    : 0;
                return (
                  <div key={key} className={styles.statutItem}>
                    <div className={styles.statutRow}>
                      <span className={styles.statutLabel}>{label}</span>
                      <span className={styles.statutCount}>
                        {count} ({pct}%)
                      </span>
                    </div>
                    <div className={styles.barTrack}>
                      <div
                        className={styles.barFill}
                        style={{
                          width: `${pct}%`,
                          background: statutColor[key],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Paiements */}
            <div className={styles.paiementSection}>
              <h4 className={styles.paiementTitle}>Paiements</h4>
              <div className={styles.paiementRow}>
                <div className={styles.paiementBar}>
                  <div
                    style={{
                      width: `${
                        caTotal > 0 ? (caEncaisse / caTotal) * 100 : 0
                      }%`,
                      background: "#6dbc8d",
                      height: "100%",
                      borderRadius: "99px",
                    }}
                  />
                </div>
              </div>
              <div className={styles.paiementLegend}>
                <span style={{ color: "#2d7a4e" }}>
                  ■ Encaissé : {caEncaisse.toLocaleString("fr-FR")} €
                </span>
                <span style={{ color: "#e9a227" }}>
                  ■ En attente : {caAttente.toLocaleString("fr-FR")} €
                </span>
              </div>
            </div>
          </div>

          {/* Tableau toutes missions */}
          <div className={`${styles.panel} ${styles.panelFull}`}>
            <h3 className={styles.panelTitle}>Historique des missions</h3>
            {missions.length === 0 ? (
              <p
                style={{
                  color: "#8fa0b4",
                  fontSize: 14,
                  textAlign: "center",
                  padding: "24px 0",
                }}
              >
                Aucune mission enregistrée
              </p>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Heure</th>
                    <th>Machine</th>
                    <th>Client</th>
                    <th>Lieu</th>
                    <th>Statut</th>
                    <th>Prix</th>
                  </tr>
                </thead>
                <tbody>
                  {[...missions]
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .map((m) => (
                      <tr key={m.id}>
                        <td className={styles.dateCell}>{m.date}</td>
                        <td>{m.heure}</td>
                        <td>
                          <span
                            className={styles.macBadge}
                            style={{
                              background: MACHINE_COLOR[m.machine] + "18",
                              color: MACHINE_COLOR[m.machine],
                              borderLeft: `3px solid ${
                                MACHINE_COLOR[m.machine]
                              }`,
                            }}
                          >
                            {m.machine}
                          </span>
                        </td>
                        <td>
                          {m.nomEntreprise || (
                            <span className={styles.empty}>—</span>
                          )}
                        </td>
                        <td>{m.lieu}</td>
                        <td>
                          <span
                            className={styles.badge}
                            style={{
                              background: statutColor[m.statut] + "20",
                              color: statutColor[m.statut],
                            }}
                          >
                            {statutLabel[m.statut]}
                          </span>
                        </td>
                        <td className={styles.prixCell}>
                          {m.prix
                            ? `${Number(m.prix).toLocaleString("fr-FR")} €`
                            : "—"}
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr className={styles.totalRow}>
                    <td colSpan={6} className={styles.totalLabel}>
                      Total
                    </td>
                    <td className={styles.totalVal}>
                      {caTotal.toLocaleString("fr-FR")} €
                    </td>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Rapports;
