import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Box, Grid, ListItemDecorator, Tab, TabList, Tabs } from "@mui/joy/";
import { useState } from "react";

import Image from "next/image";
import LoginInputs from "../modules/LoginInputs";
import SignUpInputs from "../modules/SignUpInputs";

export default function LoginTemplate() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleSignUp = () => {
    setTabIndex(0);
  };

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(/app.webp)",
            backgroundRepeat: "no-repeat",
            backgroundColor: "background.surface",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid xs={12} sm={8} md={5}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Image
              width="110"
              height="80"
              src="/logo.png"
              alt="App Logo Image"
            />

            <Tabs
              aria-label="Outlined tabs"
              value={tabIndex}
              defaultValue={0}
              onChange={(event, value) => setTabIndex(value as number)}
              sx={{ borderRadius: "lg", mb: 4 }}>
              <TabList variant="outlined">
                <Tab
                  variant={tabIndex === 0 ? "soft" : "plain"}
                  color={tabIndex === 0 ? "primary" : "neutral"}>
                  <ListItemDecorator>
                    <LoginIcon />
                  </ListItemDecorator>
                  First tab
                </Tab>
                <Tab
                  variant={tabIndex === 1 ? "soft" : "plain"}
                  color={tabIndex === 1 ? "info" : "neutral"}>
                  <ListItemDecorator>
                    <PersonAddAltIcon />
                  </ListItemDecorator>
                  SignUp
                </Tab>
              </TabList>
            </Tabs>
            {tabIndex ? (
              <SignUpInputs onSignUp={handleSignUp} />
            ) : (
              <LoginInputs />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
