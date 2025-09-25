import { Link } from "@nextui-org/react";
import { DinamizandoClassTime } from "./DinamizandoClassTime";

const FirstAccordionContent = ({ imgURL, imgAlt, jsonFirstAccordion }) => {
  return (
    <>
      <div className="font-normal">
        <p>
          Edital UESC n. {jsonFirstAccordion.edital} -{" "}
          <Link
            isExternal
            href={jsonFirstAccordion.linkEdital}
            showAnchorIcon
          >
            clique aqui
          </Link>
        </p>
        <p>Quadro de turmas:</p>
        <div className="flex justify-center">
          <DinamizandoClassTime imgURL={imgURL} imgAlt={imgAlt} />
        </div>
      </div>
    </>
  );
};
export default FirstAccordionContent;
