import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "../components/login";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
      width={"100%"}
      background={theme.palette.background.alt}
      p="1rem 6%"
      textAlign={"center"}>
      <Typography
        fontWeight="bold"
        fontSize="clamp(1rem, 2rem, 2.25rem)"
        color="primary">
        Welcome to TPOSTS
      </Typography>

      <Box
        width={isNonMobileScreens ? "50%" : "90%"}
        p="2rem"
        m="2rem auto"
        borderRadius={"1.5rem "}
        backgroundColor={theme.palette.background.alt}>
        <Typography fontWeight={"500"} variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Tposts Login, or register with us to experience an extra
          ordinary journey or create posts
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;