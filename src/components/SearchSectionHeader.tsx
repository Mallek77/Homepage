import { FunctionComponent } from "react";
import { Typography, Box } from "@mui/material";
import styles from "./SearchSectionHeader.module.css";

export type SearchSectionHeaderType = {
  className?: string;
};

const SearchSectionHeader: FunctionComponent<SearchSectionHeaderType> = ({
  className = "",
}) => {
  return (
    <Box className={[styles.searchSectionHeader, className].join(" ")}>
      <Box className={styles.leftSide}>
        <Typography
          className={styles.staysNearby}
          variant="inherit"
          variantMapping={{ inherit: "h3" }}
          sx={{
            fontWeight: "400",
            lineHeight: "120%",
            letterSpacing: "0.02em",
          }}
        >
          Stays nearby:
        </Typography>
        <Typography
          className={styles.torontoOntario}
          variant="inherit"
          variantMapping={{ inherit: "h3" }}
          sx={{
            fontWeight: "600",
            lineHeight: "120%",
            letterSpacing: "0.02em",
          }}
        >
          Toronto Ontario
        </Typography>
      </Box>
      <Box className={styles.layoutSelection}>
        <Box className={styles.layoutOptions}>
          <img className={styles.bentoMenu1Icon} alt="" />
        </Box>
        <Box className={styles.layoutOptions2}>
          <img className={styles.bentoMenu1Icon} alt="" />
        </Box>
      </Box>
    </Box>
  );
};

export default SearchSectionHeader;
