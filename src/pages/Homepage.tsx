import { FunctionComponent, useState, useCallback } from "react";
import { Box, Button } from "@mui/material";
import Header from "../components/Header";
import HeroContainer from "../components/HeroContainer";
import SearchSectionHeader from "../components/SearchSectionHeader";
import ListingItem from "../components/ListingItem";
import Footer from "../components/Footer";
import styles from "./Homepage.module.css";

export type HomepageType = {};

const Homepage: FunctionComponent<HomepageType> = ({}) => {
  const [listingItemItems] = useState([
    {
      showSuperhostTag: true,
      superhostTagPadding: "6px" as const,
      listingTitle: "Brightwoods Cabins",
      rating: "4.9",
      listingItemHeight: "408px" as const,
      heartIconFilter: undefined,
      listingContMinWidth: undefined,
      listingSubtitle: "Bridlepath, Ontario, Canada",
      listingItemMinWidth: "288px" as const,
      price: "$658",
    },
    {
      showSuperhostTag: false,
      superhostTagPadding: "6px" as const,
      listingTitle: "Missisuaga Aistream",
      rating: "4.8",
      listingItemHeight: "408px" as const,
      heartIconFilter: undefined,
      listingContMinWidth: undefined,
      listingSubtitle: "Missisauga, Ontario, Canada",
      listingItemMinWidth: "288px" as const,
      price: "$502",
    },
    {
      showSuperhostTag: false,
      superhostTagPadding: "6px" as const,
      listingTitle: "Urban Loft",
      rating: "4.5",
      listingItemHeight: "408px" as const,
      heartIconFilter: undefined,
      listingContMinWidth: undefined,
      listingSubtitle: "Georgina Bay, Ontario, Canada",
      listingItemMinWidth: "288px" as const,
      price: "$410",
    },
    {
      showSuperhostTag: false,
      superhostTagPadding: "6px" as const,
      listingTitle: "Forestville Cottages",
      rating: "5.0",
      listingItemHeight: "408px" as const,
      heartIconFilter: undefined,
      listingContMinWidth: undefined,
      listingSubtitle: "Simcoe, Ontario Canada",
      listingItemMinWidth: "288px" as const,
      price: "$325",
    },
    {
      showSuperhostTag: false,
      superhostTagPadding: "6px" as const,
      listingTitle: "Unionville Logde",
      rating: "4.6",
      listingItemHeight: "408px" as const,
      heartIconFilter: undefined,
      listingContMinWidth: undefined,
      listingSubtitle: "Markham, Ontario Canada",
      listingItemMinWidth: "288px" as const,
      price: "$485",
    },
    {
      showSuperhostTag: false,
      superhostTagPadding: "6px" as const,
      listingTitle: "Niagara Homes",
      rating: "4.9",
      listingItemHeight: "408px" as const,
      heartIconFilter: undefined,
      listingContMinWidth: undefined,
      listingSubtitle: "Niagara, Ontario, Canada",
      listingItemMinWidth: "288px" as const,
      price: "$655",
    },
    {
      showSuperhostTag: false,
      superhostTagPadding: "6px" as const,
      listingTitle: "Sunny Estate",
      rating: "5.0",
      listingItemHeight: "408px" as const,
      heartIconFilter: undefined,
      listingContMinWidth: undefined,
      listingSubtitle: "Barcort, Ontario Canada",
      listingItemMinWidth: "288px" as const,
      price: "$320",
    },
    {
      showSuperhostTag: false,
      superhostTagPadding: "6px" as const,
      listingTitle: "Lawrence Hills",
      rating: "5.0",
      listingItemHeight: "408px" as const,
      heartIconFilter: undefined,
      listingContMinWidth: undefined,
      listingSubtitle: "Lawrence, Ontario Canada",
      listingItemMinWidth: "288px" as const,
      price: "$350",
    },
    {
      showSuperhostTag: false,
      superhostTagPadding: "6px" as const,
      listingTitle: "Simcoe Lake Lodge",
      rating: "5.0",
      listingItemHeight: "408px" as const,
      heartIconFilter: undefined,
      listingContMinWidth: undefined,
      listingSubtitle: "Simcoe, Ontario, Canada",
      listingItemMinWidth: "288px" as const,
      price: "$395",
    },
    {
      showSuperhostTag: false,
      superhostTagPadding: "6px" as const,
      listingTitle: "Wasaga Beach Home",
      rating: "5.0",
      listingItemHeight: "408px" as const,
      heartIconFilter: undefined,
      listingContMinWidth: undefined,
      listingSubtitle: "Georgina Bay, Ontario, Canada",
      listingItemMinWidth: "288px" as const,
      price: "$385",
    },
    {
      showSuperhostTag: false,
      superhostTagPadding: "6px" as const,
      listingTitle: "Banff Hills",
      rating: "5.0",
      listingItemHeight: "408px" as const,
      heartIconFilter: undefined,
      listingContMinWidth: undefined,
      listingSubtitle: "Banff, Alberta, Canada",
      listingItemMinWidth: "288px" as const,
      price: "$385",
    },
    {
      showSuperhostTag: false,
      superhostTagPadding: "6px" as const,
      listingTitle: "Creemore Canada",
      rating: "5.0",
      listingItemHeight: "408px" as const,
      heartIconFilter: undefined,
      listingContMinWidth: undefined,
      listingSubtitle: "Creemore, Alberta, Canada",
      listingItemMinWidth: "288px" as const,
      price: "$385",
    },
    {
      showSuperhostTag: false,
      superhostTagPadding: "6px" as const,
      listingTitle: "Kawartha Lakes",
      rating: "5.0",
      listingItemHeight: "408px" as const,
      heartIconFilter: undefined,
      listingContMinWidth: undefined,
      listingSubtitle: "Kawartha, Alberta,  Canada",
      listingItemMinWidth: "288px" as const,
      price: "$385",
    },
    {
      showSuperhostTag: false,
      superhostTagPadding: "6px" as const,
      listingTitle: "Revelstoke Cabin",
      rating: "5.0",
      listingItemHeight: "408px" as const,
      heartIconFilter: undefined,
      listingContMinWidth: undefined,
      listingSubtitle: "Revelstoke, Alberta, Canada",
      listingItemMinWidth: "288px" as const,
      price: "$385",
    },
    {
      showSuperhostTag: false,
      superhostTagPadding: "6px" as const,
      listingTitle: "Brightwoods Estate",
      rating: "5.0",
      listingItemHeight: "408px" as const,
      heartIconFilter: undefined,
      listingContMinWidth: undefined,
      listingSubtitle: "Brightwoods Estate",
      listingItemMinWidth: "288px" as const,
      price: "$385",
    },
    {
      showSuperhostTag: false,
      superhostTagPadding: "6px" as const,
      listingTitle: "Brightwoods Estate",
      rating: "5.0",
      listingItemHeight: "408px" as const,
      heartIconFilter: undefined,
      listingContMinWidth: undefined,
      listingSubtitle: "Brightwoods Estate",
      listingItemMinWidth: "288px" as const,
      price: "$385",
    },
  ]);

  const onBecomeAHostClick = useCallback(() => {
    // Please sync "Sign Up Page" to the project
  }, []);

  const onListingItemClick = useCallback(() => {
    // Please sync "Property Details" to the project
  }, []);

  const onListingItemItemClick = useCallback((index: number) => {
    if (index === 0) {
      onListingItemClick();
    }
  }, []);
  return (
    <Box className={styles.homepage}>
      <Header
        onBecomeAHostClick={onBecomeAHostClick}
        headerPadding="14px 20px 12px"
      />
      <HeroContainer />
      <main className={styles.staysSectionWrapper}>
        <section className={styles.staysSection}>
          <SearchSectionHeader />
          <Box className={styles.homes}>
            {listingItemItems.map((item, index) => (
              <ListingItem
                key={index}
                showSuperhostTag={item.showSuperhostTag}
                superhostTagPadding={item.superhostTagPadding}
                listingTitle={item.listingTitle}
                rating={item.rating}
                listingItemHeight={item.listingItemHeight}
                heartIconFilter={item.heartIconFilter}
                listingContMinWidth={item.listingContMinWidth}
                listingSubtitle={item.listingSubtitle}
                listingItemMinWidth={item.listingItemMinWidth}
                price={item.price}
                onListingItemClick={() => onListingItemItemClick(index)}
              />
            ))}
          </Box>
          <Button
            className={styles.showMoreButton}
            disableElevation
            variant="outlined"
            sx={{
              textTransform: "none",
              color: "#00c29f",
              fontSize: "16",
              borderColor: "#00c29f",
              borderRadius: "6px",
              "&:hover": { borderColor: "#00c29f" },
              width: 147,
            }}
          >
            Show more
          </Button>
        </section>
      </main>
      <Footer
        localhostAlignSelf="stretch"
        wrappedLayerJustifyContent="center"
        hostingAlignSelf="stretch"
        localhostWidth="unset"
        supportWidth="unset"
        footerPadding="20px"
        footerBorderTop="unset"
        supportAlignSelf="stretch"
        hostingWidth="unset"
      />
      <Box className={styles.band}>
        <Box className={styles.container}>
          <div className={styles.localhostIncAll}>
            © 2023 Localhost, Inc. All Rights Reserved
          </div>
          <Box className={styles.privacyPolicyParent}>
            <div className={styles.privacyPolicy}>Privacy Policy</div>
            <div className={styles.privacyPolicy}>{`Terms & Conditions`}</div>
            <div className={styles.privacyPolicy}>Contact us</div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Homepage;
