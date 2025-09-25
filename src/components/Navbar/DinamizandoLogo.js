import Image from "next/image";
import React from "react";
import Logo from "../../../public/Logo.png";
import Link from "next/link";
export const DinamizandoLogo = () => (
  <Link href="/">
    <Image
      src={Logo}
      alt="Logo do Dinamizando"
      width={200}
      height={60}
      className="cursor-pointer"
    />
  </Link>
);
