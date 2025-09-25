import Image from "next/image";
import React from "react";
export const DinamizandoClassTime = ({ imgURL, imgAlt }) => (
  <Image src={imgURL} alt={imgAlt} className="cursor-pointer" />
);
