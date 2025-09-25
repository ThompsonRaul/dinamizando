import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import ScrollToTopButton from "../ScrollToTop/ScrollToTopButton";
import Image from "next/image";

const QECRAccordion = ({ imgURL, imgAlt, jsonFirstAccordion, jsonMap }) => {
  return (
    <>
      <div className="mt-4">
        <Accordion className="min-h-screen" variant="splitted">
          <AccordionItem
            className="font-bold"
            key={jsonFirstAccordion.nome}
            aria-label={jsonFirstAccordion.nome}
            title={jsonFirstAccordion.nome}
          >
            <div className="flex justify-center">
              <Image src={imgURL} alt={imgAlt} className="cursor-pointer" />
            </div>
          </AccordionItem>
          {jsonMap.map((topicos) => (
            <AccordionItem
              className="font-bold"
              key={`${topicos.nome}`}
              aria-label={topicos.nome}
              title={topicos.nome}
            >
              {topicos.tipos.map((entrevistado) => (
                <div key={`${entrevistado.descricao}`} className="font-bold">
                  {entrevistado.descricao}
                  <div className="font-normal">
                    {entrevistado.pessoas.map((pessoa, index) => (
                      <p key={`${pessoa}-${index}`}>{pessoa}</p>
                    ))}
                  </div>
                  <br />
                </div>
              ))}
            </AccordionItem>
          ))}
        </Accordion>

        <ScrollToTopButton />
      </div>
    </>
  );
};

export default QECRAccordion;
