import {
  FunctionComponent,
  useMemo,
  type CSSProperties,
  useCallback,
} from "react";
import { Box } from "@mui/material";
import styles from "./ListingItem.module.css";

export type ListingItemType = {
  className?: string;
  showSuperhostTag?: boolean;
  listingTitle?: string;
  rating?: string;
  listingSubtitle?: string;
  price?: string;

  /** Style props */
  superhostTagPadding?: CSSProperties["padding"];
  listingItemHeight?: CSSProperties["height"];
  heartIconFilter?: CSSProperties["filter"];
  listingContMinWidth?: CSSProperties["minWidth"];
  listingItemMinWidth?: CSSProperties["minWidth"];

  /** Action props */
  onListingItemClick?: () => void;
};

const ListingItem: FunctionComponent<ListingItemType> = ({
  className = "",
  showSuperhostTag,
  superhostTagPadding,
  onListingItemClick,
  listingTitle,
  rating,
  listingItemHeight,
  heartIconFilter,
  listingContMinWidth,
  listingSubtitle,
  listingItemMinWidth,
  price,
}) => {
  const superhostTagStyle: CSSProperties = useMemo(() => {
    return {
      padding: superhostTagPadding,
    };
  }, [superhostTagPadding]);

  const listingItemStyle: CSSProperties = useMemo(() => {
    return {
      height: listingItemHeight,
      minWidth: listingItemMinWidth,
    };
  }, [listingItemHeight, listingItemMinWidth]);

  const heartIconStyle: CSSProperties = useMemo(() => {
    return {
      filter: heartIconFilter,
    };
  }, [heartIconFilter]);

  const listingContStyle: CSSProperties = useMemo(() => {
    return {
      minWidth: listingContMinWidth,
    };
  }, [listingContMinWidth]);

  const onListingItemClick1 = useCallback(() => {
    // Please sync "Property Details" to the project
  }, []);

  return (
    <section
      className={[styles.listingItem, className].join(" ")}
      onClick={onListingItemClick}
      style={listingItemStyle}
    >
      <img className={styles.listing01ImageIcon} alt="" />
      {!!showSuperhostTag && (
        <Box className={styles.superhostTag} style={superhostTagStyle}>
          <img className={styles.superhostIcon} alt="" />
          <div className={styles.superhost}>Superhost</div>
        </Box>
      )}
      <img className={styles.heartIcon} alt="" style={heartIconStyle} />
      <Box className={styles.itemDetails}>
        <Box className={styles.listingInfo}>
          <Box className={styles.listingCont} style={listingContStyle}>
            <div className={styles.listingTitle}>{listingTitle}</div>
            <div className={styles.listingSubtitle}>{listingSubtitle}</div>
          </Box>
          <Box className={styles.ratingCont}>
            <div className={styles.rating}>{rating}</div>
            <img className={styles.starIcon} loading="lazy" alt="" />
          </Box>
        </Box>
        <Box className={styles.bottomContainer}>
          <Box className={styles.pricePerNight}>
            <div className={styles.rating}>{price}</div>
            <div className={styles.night}>/night</div>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default ListingItem;
