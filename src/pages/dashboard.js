"use client";
import React, { useEffect } from "react";
import Container from "../components/Container";


import withAuth from "../utils/withAuth";

import Layout from "../components/dashboard/layout";


const drawWidth = 220;

function Dashboard(props) {


  return (
    <Layout>
      <Container  />
    </Layout>
  );
}

export default withAuth(Dashboard);
