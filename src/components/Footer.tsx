import { FunctionComponent, useMemo, type CSSProperties } from "react";
import { Typography, Box } from "@mui/material";
import styles from "./Footer.module.css";

export type FooterType = {
  className?: string;

  /** Style props */
  localhostAlignSelf?: CSSProperties["alignSelf"];
  wrappedLayerJustifyContent?: CSSProperties["justifyContent"];
  hostingAlignSelf?: CSSProperties["alignSelf"];
  localhostWidth?: CSSProperties["width"];
  supportWidth?: CSSProperties["width"];
  footerPadding?: CSSProperties["padding"];
  footerBorderTop?: CSSProperties["borderTop"];
  supportAlignSelf?: CSSProperties["alignSelf"];
  hostingWidth?: CSSProperties["width"];
};

const Footer: FunctionComponent<FooterType> = ({
  className = "",
  localhostAlignSelf,
  wrappedLayerJustifyContent,
  hostingAlignSelf,
  localhostWidth,
  supportWidth,
  footerPadding,
  footerBorderTop,
  supportAlignSelf,
  hostingWidth,
}) => {
  const localhostStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: localhostAlignSelf,
      width: localhostWidth,
    };
  }, [localhostAlignSelf, localhostWidth]);

  const wrappedLayerStyle: CSSProperties = useMemo(() => {
    return {
      justifyContent: wrappedLayerJustifyContent,
    };
  }, [wrappedLayerJustifyContent]);

  const hostingStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: hostingAlignSelf,
      width: hostingWidth,
    };
  }, [hostingAlignSelf, hostingWidth]);

  const supportStyle: CSSProperties = useMemo(() => {
    return {
      width: supportWidth,
      alignSelf: supportAlignSelf,
    };
  }, [supportWidth, supportAlignSelf]);

  const footerStyle: CSSProperties = useMemo(() => {
    return {
      padding: footerPadding,
      borderTop: footerBorderTop,
    };
  }, [footerPadding, footerBorderTop]);

  return (
    <footer
      className={[styles.footer, className].join(" ")}
      style={footerStyle}
    >
      <Box className={styles.wrappedLayer} style={wrappedLayerStyle}>
        <Box className={styles.suportColumn}>
          <Typography
            className={styles.support}
            variant="inherit"
            variantMapping={{ inherit: "h3" }}
            sx={{ fontWeight: "600", fontSize: "var(--fs-20)" }}
            style={supportStyle}
          >
            Support
          </Typography>
          <div className={styles.helpCentre}>Help Centre</div>
          <div className={styles.helpCentre}>AirCover</div>
          <div className={styles.helpCentre}>Combating discrimination</div>
          <div className={styles.helpCentre}>
            Supporting people with disabilities
          </div>
          <div className={styles.helpCentre}>Cencellation options</div>
        </Box>
        <Box className={styles.suportColumn}>
          <Typography
            className={styles.hosting}
            variant="inherit"
            variantMapping={{ inherit: "h3" }}
            sx={{ fontWeight: "600", fontSize: "var(--fs-20)" }}
            style={hostingStyle}
          >
            Hosting
          </Typography>
          <div className={styles.localHome}>Local home</div>
          <div className={styles.localHome}>Cover for hosts</div>
          <div className={styles.localHome}>Hosting resources</div>
          <div className={styles.localHome}>Community forum</div>
          <div className={styles.localHome}>Hosting responsibly</div>
        </Box>
        <Box className={styles.suportColumn}>
          <Typography
            className={styles.localhost}
            variant="inherit"
            variantMapping={{ inherit: "h3" }}
            sx={{ fontWeight: "600", fontSize: "var(--fs-20)" }}
            style={localhostStyle}
          >
            Localhost
          </Typography>
          <div className={styles.helpCentre}>Newsroom</div>
          <div className={styles.helpCentre}>New Features</div>
          <div className={styles.helpCentre}>Careers</div>
          <div className={styles.helpCentre}>Investres</div>
          <div className={styles.helpCentre}>Gift cards</div>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
