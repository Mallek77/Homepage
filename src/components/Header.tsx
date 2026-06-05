import { FunctionComponent, useMemo, type CSSProperties } from "react";
import { Box } from "@mui/material";
import styles from "./Header.module.css";

export type HeaderType = {
  className?: string;
  logo?: string;

  /** Style props */
  headerPadding?: CSSProperties["padding"];

  /** Action props */
  onLogoClick?: () => void;
  onBecomeAHostClick?: () => void;
};

const Header: FunctionComponent<HeaderType> = ({
  className = "",
  onLogoClick,
  onBecomeAHostClick,
  logo,
  headerPadding,
}) => {
  const headerStyle: CSSProperties = useMemo(() => {
    return {
      padding: headerPadding,
    };
  }, [headerPadding]);

  return (
    <header
      className={[styles.header, className].join(" ")}
      style={headerStyle}
    >
      <Box className={styles.headerContent}>
        <img
          className={styles.logoIcon}
          loading="lazy"
          alt=""
          onClick={onLogoClick}
        />
        <nav className={styles.navLinks}>
          <div className={styles.home}>Home</div>
          <div className={styles.home}>Stays</div>
          <div className={styles.home} onClick={onBecomeAHostClick}>
            Become a host
          </div>
        </nav>
      </Box>
    </header>
  );
};

export default Header;
