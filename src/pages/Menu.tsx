import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import styles from "./Menu.module.css";

const menuItems = [
  {
    icon: "calendar" as const,
    label: "Planning",
    description: "Visualiser et gérer le calendrier des missions",
    path: "/planning",
    color: "#2a9d8f",
    bg: "rgba(42,157,143,0.1)",
  },
  {
    icon: "assignment" as const,
    label: "Planning en cours",
    description: "Suivi des missions actives et en attente",
    path: "/planning-en-cours",
    color: "#5b8dee",
    bg: "rgba(91,141,238,0.1)",
  },
  {
    icon: "add-task" as const,
    label: "Nouvelle Mission",
    description: "Créer et remplir le formulaire d'une nouvelle mission",
    path: "/missions",
    color: "#e9c46a",
    bg: "rgba(233,196,106,0.1)",
  },
  {
    icon: "home" as const,
    label: "Accueil / Dashboard",
    description: "Vue d'ensemble des statistiques et activités",
    path: "/dashboard",
    color: "#6dbc8d",
    bg: "rgba(109,188,141,0.1)",
  },
];

const Menu: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}>
            <Icon name="construction" size={28} color="#fff" />
          </div>
          <div>
            <h1 className={styles.logoName}>Azur Levage</h1>
            <p className={styles.logoSub}>
              Modern industrial logistics and scheduling
            </p>
          </div>
        </div>
        <button className={styles.logoutBtn} onClick={() => navigate("/")}>
          <Icon name="arrow-back" size={18} color="#64748b" />
          Déconnexion
        </button>
      </div>

      <div className={styles.body}>
        <h2 className={styles.title}>Que souhaitez-vous faire ?</h2>
        <p className={styles.subtitle}>Choisissez une section pour continuer</p>

        <div className={styles.grid}>
          {menuItems.map((item) => (
            <button
              key={item.path}
              className={styles.menuCard}
              onClick={() => navigate(item.path)}
            >
              <div className={styles.iconWrap} style={{ background: item.bg }}>
                <Icon name={item.icon} size={32} color={item.color} />
              </div>
              <div className={styles.cardText}>
                <span className={styles.cardLabel}>{item.label}</span>
                <span className={styles.cardDesc}>{item.description}</span>
              </div>
              <div className={styles.arrow}>
                <Icon name="arrow-forward" size={18} color="#94a3b8" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
