import HomeCard from "@/components/modules/ModuleCard";
import { GRADIENT_COLORS } from "@/constants/ui";
import prisma from "@/lib/prisma";
import { Box, Container, Grid, Typography } from "@mui/joy";
import { Module } from "@prisma/client";
import { GetServerSideProps, PreviewData } from "next";
import { getSession } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import Quote from "../components/core/Quote";
import HomeHeader from "../components/modules/homeHeader";

const Home: React.FC<Props> = ({ courseModules }) => {
  courseModules = JSON.parse(courseModules);
  return (
    <Box height="100%" pb={10}>
      <HomeHeader />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Quote
          quote="Develop a passion for learning. If you do, you will never cease to grow."
          author="Anthony D’Angelo"
        />
      </Box>
      <Container sx={{ height: "100%", mt: 10 }}>
        <Grid container spacing={10} sx={{ justifyContent: "center" }}>
          {courseModules ? (
            courseModules.map((module, index) => (
              <Grid key={module.id} xs={10} sm={6} md={4}>
                <HomeCard
                  title={module.name}
                  slug={module.slug}
                  id={module.id}
                  index={index}
                  bg={GRADIENT_COLORS[index]}
                />
              </Grid>
            ))
          ) : (
            <Typography>No Courses Modules are found</Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};
interface Props {
  courseModules: Module[] | undefined;
}

export const getServerSideProps: GetServerSideProps<
  Props,
  ParsedUrlQuery,
  PreviewData
> = async (ctx) => {
  const { req, res } = ctx;
  let courseModules: Module[] | undefined;
  const session = await getSession({ req });

  if (!session) {
    res.writeHead(302, {
      Location: "/login",
    });
    res.end();
    return { props: { courseModules: [] } };
  }
  try {
    courseModules = await prisma.module.findMany({});
  } catch (err) {
    return { props: { courseModules: [] } };
  }

  return {
    props: { courseModules: JSON.stringify(courseModules) },
  };
};

export default Home;
