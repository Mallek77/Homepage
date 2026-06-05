import { FunctionComponent, useState } from "react";
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import styles from "./HeroContainer.module.css";

export type HeroContainerType = {
  className?: string;
};

const HeroContainer: FunctionComponent<HeroContainerType> = ({
  className = "",
}) => {
  const [
    checkinDatePickerDateTimePickerValue,
    setCheckinDatePickerDateTimePickerValue,
  ] = useState(null);
  const [
    checkoutDatePickerDateTimePickerValue,
    setCheckoutDatePickerDateTimePickerValue,
  ] = useState(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <section className={[styles.heroContainer, className].join(" ")}>
        <Box className={styles.content}>
          <Box className={styles.titleContainer}>
            <Typography
              className={styles.title}
              variant="inherit"
              variantMapping={{ inherit: "h1" }}
              sx={{ fontWeight: "700", lineHeight: "110%" }}
            >
              <Typography
                variant="inherit"
                variantMapping={{ inherit: "span" }}
                sx={{ lineHeight: "110%" }}
              >{`Find a `}</Typography>
              <Typography
                className={styles.host}
                variant="inherit"
                variantMapping={{ inherit: "span" }}
                sx={{ lineHeight: "110%" }}
              >
                host
              </Typography>
              <Typography
                variant="inherit"
                variantMapping={{ inherit: "span" }}
                sx={{ lineHeight: "110%" }}
              >
                {" "}
                for every journey
              </Typography>
            </Typography>
            <Typography
              className={styles.subtitle}
              variant="inherit"
              variantMapping={{ inherit: "h3" }}
              sx={{
                fontWeight: "300",
                fontSize: "var(--fs-20)",
                lineHeight: "120%",
              }}
            >
              Discover the best local rental properties that fits your every
              travel needs
            </Typography>
          </Box>
          <Box className={styles.form}>
            <TextField
              className={styles.accomodationInput}
              placeholder="Accommodation"
              variant="outlined"
              slotProps={{
                input: {
                  endAdornment: (
                    <img width="24px" height="24px" src="/icon-home.svg" />
                  ),
                },
              }}
              sx={{
                "& fieldset": { borderColor: "#d9d9d9" },
                "& .MuiInputBase-root": {
                  height: "56px",
                  backgroundColor: "#fff",
                  paddingRight: "12px",
                  fontSize: "14px",
                },
                "& .MuiInputBase-input": { color: "#000" },
              }}
            />
            <Box className={styles.inputContainer}>
              <Box className={styles.checkinDatepicker}>
                <DatePicker
                  value={checkinDatePickerDateTimePickerValue}
                  onChange={(newValue: any) => {
                    setCheckinDatePickerDateTimePickerValue(newValue);
                  }}
                  sx={{
                    fieldset: {
                      borderColor: "#d9d9d9",
                      borderTopWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                      borderLeftWidth: 1,
                    },
                    "&:hover": {
                      fieldset: { borderColor: "#d9d9d9" },
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "#d9d9d9",
                      },
                    },
                    "& input::placeholder": {
                      textColor: "rgba(0, 0, 0, 0.85)",
                      fontSize: 14,
                    },
                    input: {
                      color: "rgba(0, 0, 0, 0.85)",
                      fontSize: 14,
                      textAlign: "left",
                      fontWeight: "400",
                    },
                    "& .MuiButtonBase-root": { width: "40px" },
                    "& .MuiPickersInputBase-root": {
                      backgroundColor: "#fff",
                      height: 56,
                      gap: "8px",
                      flexDirection: { flexDirection: "row" },
                    },
                    "& .MuiPickersInputBase-sectionsContainer": {
                      width: "unset",
                    },
                  }}
                  slotProps={{
                    textField: {
                      size: "medium",
                      fullWidth: true,
                      required: false,
                      autoFocus: false,
                      error: false,
                      placeholder: "Check-in",
                    },
                    openPickerIcon: {
                      component: () => (
                        <img
                          width="24px"
                          height="24px"
                          src="/CalendarTodayFilled.svg"
                        />
                      ),
                    },
                  }}
                />
              </Box>
              <Box className={styles.checkinDatepicker}>
                <DatePicker
                  value={checkoutDatePickerDateTimePickerValue}
                  onChange={(newValue: any) => {
                    setCheckoutDatePickerDateTimePickerValue(newValue);
                  }}
                  sx={{
                    fieldset: {
                      borderColor: "#d9d9d9",
                      borderTopWidth: 1,
                      borderRightWidth: 1,
                      borderBottomWidth: 1,
                      borderLeftWidth: 1,
                    },
                    "&:hover": {
                      fieldset: { borderColor: "#d9d9d9" },
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "#d9d9d9",
                      },
                    },
                    "& input::placeholder": {
                      textColor: "rgba(0, 0, 0, 0.85)",
                      fontSize: 14,
                    },
                    input: {
                      color: "rgba(0, 0, 0, 0.85)",
                      fontSize: 14,
                      textAlign: "left",
                      fontWeight: "400",
                    },
                    "& .MuiButtonBase-root": { width: "40px" },
                    "& .MuiPickersInputBase-root": {
                      backgroundColor: "#fff",
                      height: 56,
                      gap: "8px",
                      flexDirection: { flexDirection: "row" },
                    },
                    "& .MuiPickersInputBase-sectionsContainer": {
                      width: "unset",
                    },
                  }}
                  slotProps={{
                    textField: {
                      size: "medium",
                      fullWidth: true,
                      required: false,
                      autoFocus: false,
                      error: false,
                      placeholder: "Check-out",
                    },
                    openPickerIcon: {
                      component: () => (
                        <img
                          width="24px"
                          height="24px"
                          src="/CalendarTodayFilled-1.svg"
                        />
                      ),
                    },
                  }}
                />
              </Box>
              <TextField
                className={styles.guestInput}
                placeholder="Guest"
                variant="outlined"
                slotProps={{
                  input: {
                    endAdornment: (
                      <img width="24px" height="24px" src="/icon-user.svg" />
                    ),
                  },
                }}
                sx={{
                  "& fieldset": { borderColor: "#d9d9d9" },
                  "& .MuiInputBase-root": {
                    height: "56px",
                    backgroundColor: "#fff",
                    paddingRight: "12px",
                    fontSize: "14px",
                  },
                  "& .MuiInputBase-input": { color: "rgba(0, 0, 0, 0.85)" },
                }}
              />
            </Box>
            <Button
              className={styles.searchButton}
              startIcon={
                <img width="19px" height="19px" src="/icon-search.svg" />
              }
              disableElevation
              variant="contained"
              sx={{
                textTransform: "none",
                color: "#fff",
                fontSize: "16",
                background: "#00c29f",
                borderRadius: "40px",
                "&:hover": { background: "#00c29f" },
              }}
            >
              Search
            </Button>
          </Box>
        </Box>
      </section>
    </LocalizationProvider>
  );
};

export default HeroContainer;
