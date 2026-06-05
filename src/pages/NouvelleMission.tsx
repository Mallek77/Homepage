import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Icon from "../components/Icon";
import { useMissions } from "../store/MissionsContext";
import styles from "./NouvelleMission.module.css";

const machines = ["Nissan 30m", "Junior", "37m Tractée"] as const;
const statuts = ["", "Payé", "En attente", "Annulé"] as const;

const heures = [
  "7H",
  "8H",
  "9H",
  "10H",
  "11H",
  "12H",
  "13H",
  "14H",
  "15H",
  "16H",
  "17H",
  "18H",
];

function validateTel(tel: string) {
  return /^(0|\+33)[1-9]([ .-]?\d{2}){4}$/.test(tel.replace(/\s/g, ""));
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const NouvelleMission: FunctionComponent = () => {
  const navigate = useNavigate();
  const { missions, addMission } = useMissions();

  const [form, setForm] = useState({
    date: "",
    heure: "",
    machine: "" as Mission["machine"] | "",
    nomEntreprise: "",
    telephone: "",
    email: "",
    lieu: "",
    statutPaiement: "" as Mission["statutPaiement"],
    prix: "",
    remarque: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [conflictError, setConflictError] = useState("");

  const set = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    if (field === "date" || field === "heure" || field === "machine") {
      setConflictError("");
    }
  };

  const checkConflict = (date: string, heure: string, machine: string) => {
    if (!date || !heure || !machine) return false;
    return missions.some(
      (m) => m.date === date && m.heure === heure && m.machine === machine
    );
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.date) newErrors.date = "La date est obligatoire";
    if (!form.heure) newErrors.heure = "L'heure est obligatoire";
    if (!form.machine) newErrors.machine = "La machine est obligatoire";
    if (form.telephone && !validateTel(form.telephone))
      newErrors.telephone = "Format invalide (ex: 06 12 34 56 78)";
    if (form.email && !validateEmail(form.email))
      newErrors.email = "Format email invalide";
    if (form.prix && isNaN(Number(form.prix)))
      newErrors.prix = "Le prix doit être un nombre";
    return newErrors;
  };

  const handleSave = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (checkConflict(form.date, form.heure, form.machine)) {
      setConflictError(
        `⚠️ La machine "${form.machine}" est déjà réservée le ${form.date} à ${form.heure}. Choisissez une autre machine ou un autre horaire.`
      );
      return;
    }
    addMission({
      date: form.date,
      heure: form.heure,
      machine: form.machine as "Nissan 30m" | "Junior" | "37m Tractée",
      nomEntreprise: form.nomEntreprise,
      telephone: form.telephone,
      email: form.email,
      lieu: form.lieu,
      statutPaiement: form.statutPaiement,
      prix: form.prix,
      remarque: form.remarque,
    });
    navigate("/planning-en-cours");
  };

  return (
    <AppLayout>
      <div className={styles.page}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <button
              className={styles.backBtn}
              onClick={() => navigate("/planning-en-cours")}
            >
              <Icon name="arrow-back" size={18} color="var(--text-secondary)" />
            </button>
            <h1 className={styles.pageTitle}>Nouvelle Mission</h1>
          </div>
          <div className={styles.topBarRight}>
            <button
              className={styles.btnCancel}
              onClick={() => navigate("/planning-en-cours")}
            >
              Annuler
            </button>
            <button className={styles.btnSave} onClick={handleSave}>
              <Icon name="save" size={16} color="#fff" />
              Enregistrer
            </button>
          </div>
        </div>

        {/* Conflit machine */}
        {conflictError && (
          <div className={styles.conflictBanner}>
            <Icon name="warning" size={18} color="#8a4a00" />
            {conflictError}
          </div>
        )}

        <div className={styles.formGrid}>
          {/* Colonne gauche — infos obligatoires */}
          <div className={styles.card}>
            <p className={styles.cardTitle}>Informations essentielles</p>

            {/* Date */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                Date <span className={styles.req}>*</span>
              </label>
              <div
                className={`${styles.inputWrap} ${
                  errors.date ? styles.inputError : ""
                }`}
              >
                <Icon
                  name="calendar-today"
                  size={17}
                  color="rgba(255,255,255,0.4)"
                />
                <input
                  type="date"
                  className={styles.input}
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                />
              </div>
              {errors.date && (
                <span className={styles.errMsg}>{errors.date}</span>
              )}
            </div>

            {/* Heure */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                Heure <span className={styles.req}>*</span>
              </label>
              <div
                className={`${styles.inputWrap} ${
                  errors.heure ? styles.inputError : ""
                }`}
              >
                <Icon name="schedule" size={17} color="rgba(255,255,255,0.4)" />
                <select
                  className={styles.select}
                  value={form.heure}
                  onChange={(e) => set("heure", e.target.value)}
                >
                  <option value="">— Choisir —</option>
                  {heures.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
              {errors.heure && (
                <span className={styles.errMsg}>{errors.heure}</span>
              )}
            </div>

            {/* Machine */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                Machine <span className={styles.req}>*</span>
              </label>
              <div
                className={`${styles.inputWrap} ${
                  errors.machine ? styles.inputError : ""
                }`}
              >
                <Icon
                  name="construction"
                  size={17}
                  color="rgba(255,255,255,0.4)"
                />
                <select
                  className={styles.select}
                  value={form.machine}
                  onChange={(e) => set("machine", e.target.value)}
                >
                  <option value="">— Choisir —</option>
                  {machines.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              {errors.machine && (
                <span className={styles.errMsg}>{errors.machine}</span>
              )}
              {/* Alerte conflit en temps réel */}
              {form.date &&
                form.heure &&
                form.machine &&
                checkConflict(form.date, form.heure, form.machine) && (
                  <span className={styles.warnMsg}>
                    ⚠️ Cette machine est déjà prise ce jour-là à cette heure
                  </span>
                )}
            </div>

            {/* Lieu */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Lieu d'intervention</label>
              <div className={styles.inputWrap}>
                <Icon name="place" size={17} color="rgba(255,255,255,0.4)" />
                <input
                  type="text"
                  className={styles.input}
                  value={form.lieu}
                  onChange={(e) => set("lieu", e.target.value)}
                  placeholder="Adresse du chantier"
                />
              </div>
            </div>
          </div>

          {/* Colonne droite — infos client + paiement */}
          <div className={styles.formSide}>
            {/* Bloc client */}
            <div className={styles.bloc}>
              <h3 className={styles.blocTitle}>
                <Icon name="person" size={16} color="#2a9d8f" />
                Informations client
              </h3>
              <div className={styles.twoCol}>
                <div className={styles.fieldGroup}>
                  <label className={styles.labelDark}>Nom entreprise</label>
                  <input
                    type="text"
                    className={styles.inputSm}
                    value={form.nomEntreprise}
                    onChange={(e) => set("nomEntreprise", e.target.value)}
                    placeholder="Société..."
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.labelDark}>Téléphone</label>
                  <input
                    type="tel"
                    className={`${styles.inputSm} ${
                      errors.telephone ? styles.inputSmError : ""
                    }`}
                    value={form.telephone}
                    onChange={(e) => set("telephone", e.target.value)}
                    placeholder="06 XX XX XX XX"
                  />
                  {errors.telephone && (
                    <span className={styles.errMsgDark}>
                      {errors.telephone}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.labelDark}>Email</label>
                <input
                  type="email"
                  className={`${styles.inputSm} ${
                    errors.email ? styles.inputSmError : ""
                  }`}
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="contact@entreprise.fr"
                />
                {errors.email && (
                  <span className={styles.errMsgDark}>{errors.email}</span>
                )}
              </div>
            </div>

            {/* Bloc paiement */}
            <div className={styles.bloc}>
              <h3 className={styles.blocTitle}>
                <Icon name="payments" size={16} color="#2a9d8f" />
                Paiement
              </h3>
              <div className={styles.twoCol}>
                <div className={styles.fieldGroup}>
                  <label className={styles.labelDark}>Prix (€)</label>
                  <input
                    type="number"
                    className={`${styles.inputSm} ${
                      errors.prix ? styles.inputSmError : ""
                    }`}
                    value={form.prix}
                    onChange={(e) => set("prix", e.target.value)}
                    placeholder="0"
                    min="0"
                  />
                  {errors.prix && (
                    <span className={styles.errMsgDark}>{errors.prix}</span>
                  )}
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.labelDark}>Statut paiement</label>
                  <select
                    className={styles.inputSm}
                    value={form.statutPaiement}
                    onChange={(e) => set("statutPaiement", e.target.value)}
                  >
                    {statuts.map((s) => (
                      <option key={s} value={s}>
                        {s || "— Non défini —"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Bloc remarque */}
            <div className={styles.bloc}>
              <h3 className={styles.blocTitle}>
                <Icon name="notes" size={16} color="#2a9d8f" />
                Remarque
              </h3>
              <textarea
                className={styles.textarea}
                value={form.remarque}
                onChange={(e) => set("remarque", e.target.value)}
                placeholder="Notes, précisions, conditions particulières..."
                rows={4}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default NouvelleMission;
