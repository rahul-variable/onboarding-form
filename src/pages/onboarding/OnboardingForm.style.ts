import { Box, Button, Card, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#f6f6f6",
  minHeight: "100vh",
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

export const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: "sm",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "50%",
  },
}));

export const StyledFormWrapper = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3, 3, 6, 3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const StyledSubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#000",
  color: "#fff",
  borderRadius: "8px",
  padding: theme.spacing(1.5),
  fontSize: 20,
  fontWeight: 400,
  textTransform: "none",
  boxShadow: "none",
  "&:hover": { backgroundColor: "#222" },
}));
