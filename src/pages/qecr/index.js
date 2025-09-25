import Head from "next/head";
import React from "react";
import DinamizandoNavbar from "@/components/Navbar/DinamizandoNavbar";
import DinamizandoFooter from "@/components/Footer/DinamizandoFooter";

import imgURL from "../../utils/images/qecr/QECR.png";
import QECRAccordion from "@/components/Accordion/QECRAccordion";

const imgAlt = "Horários de aula do Conversation Club 2024.1";
const jsonFirstAccordion = require("./fac.json");
const jsonMap = require("./qecr.json");
const QECR = () => {
  return (
    <>
      <Head>
        <title>Quadro Europeu Comum de Referência para as Línguas (QECR)</title>
        <meta
          name="description"
          content="Página do Quadro Europeu Comum de Referência para as Línguas (QECR) do Dinamizando"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DinamizandoNavbar />
      <QECRAccordion
        imgURL={imgURL}
        imgAlt={imgAlt}
        jsonFirstAccordion={jsonFirstAccordion}
        jsonMap={jsonMap}
      />
      <DinamizandoFooter />
    </>
  );
};

export default QECR;
