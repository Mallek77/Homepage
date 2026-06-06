import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import styles from "./Login.module.css";

const USERS = [
  { username: "Abdou", password: "azur2024" },
  { username: "Mikel", password: "azur2024" },
  { username: "Jennifer", password: "azur2024" },
];

const Login: FunctionComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const user = USERS.find(
        (u) => u.username === email && u.password === password
      );
      if (user) {
        localStorage.setItem("username", user.username);
        navigate("/menu");
      } else {
        setError("Identifiant ou mot de passe incorrect.");
      }
    }, 800);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}>
            <Icon name="construction" size={32} color="#fff" />
          </div>
          <h1 className={styles.logoName}>Azur&nbsp;Levage</h1>
          <p className={styles.logoSub}>Gestion des missions &amp; planning</p>
        </div>
        <form className={styles.form} onSubmit={handleLogin}>
          <h2 className={styles.title}>Connexion</h2>
          <div className={styles.field}>
            <label className={styles.label}>Identifiant</label>
            <div className={styles.inputWrap}>
              <Icon name="person" size={18} color="#94a3b8" />
              <input
                type="text"
                className={styles.input}
                placeholder="Votre prénom"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Mot de passe</label>
            <div className={styles.inputWrap}>
              <Icon name="lock" size={18} color="#94a3b8" />
              <input
                type={showPassword ? "text" : "password"}
                className={styles.input}
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon
                  name={showPassword ? "visibility-off" : "visibility"}
                  size={18}
                  color="#94a3b8"
                />
              </button>
            </div>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.btnLogin} disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
