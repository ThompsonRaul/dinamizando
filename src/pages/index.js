import { useState } from "react";
import DinamizandoFooter from "@/components/Footer/DinamizandoFooter";
import DinamizandoNavbar from "@/components/Navbar/DinamizandoNavbar";
import Head from "next/head";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";

import imgHero from "../utils/images/homepage/hero.webp";
import imgUE from "../utils/images/homepage/ue.webp";
import imgCC from "../utils/images/homepage/cc.webp";
import imgPC from "../utils/images/homepage/pc.webp";
import imgCertificados from "../utils/images/homepage/certificados.webp";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const list = [
    {
      title: "UESC English",
      img: imgUE,
      description:
        "Os cursos de inglês UESC English são ofertados semestralmente com o objetivo de desenvolver as quatro habilidades (ouvir, falar, ler, escrever) em língua inglesa à comunidade acadêmica (estudantes, professoras/es, servidoras/es e funcionárias/os terceirizadas/os) da UESC e à comunidade externa.",
      url: "/uesc-english",
    },
    {
      title: "Conversation Club",
      img: imgCC,
      description:
        "Os cursos de inglês Conversation Club são ofertados semestralmente com o objetivo de desenvolver as habilidades orais (ouvir e falar) em língua inglesa à comunidade acadêmica (estudantes, professoras/es, servidoras/es e funcionárias/os terceirizadas/os) da UESC e à comunidade externa.",
      url: "/conversation-club",
    },
    {
      title: "Popcorn Club",
      img: imgPC,
      description:
        "As oficinas de inglês Popcorn Club têm o objetivo de proporcionar um espaço interativo para o desenvolvimento das habilidades em língua inglesa à comunidade acadêmica (estudantes, professoras/es, servidoras/es e funcionárias/os terceirizadas/os) da UESC e à comunidade externa, por meio da exibição dialogada de produções audiovisuais em uma perspectiva intercultural.",
      url: "/popcorn-club",
    },
    {
      title: "Certificados",
      img: imgCertificados,
      description:
        'A partir dos editais de 2024.1, os certificados das ações do Projeto de Extensão Dinamizando o Ensino da Língua Inglesa na UESC serão disponibilizados diretamente em formato PDF pelo buscador de certificados, cabendo à cada cursista fazer a busca e o download dos certificados que tiver direito. Os certificados impressos que estavam armazenados na sala do projeto, anteriores ao semestre 2022.1, foram digitalizados e disponibilizados em nossa base de dados de certificados. Caso ainda precise de ajuda, envie e-mail para uescenglish@gmail.com com o assunto "Certificado".',
      url: "/certificados",
    },
  ];

  const openModal = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home Page do Dinamizando" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DinamizandoNavbar />

      <div className={`min-h-screen ${isOpen ? "blur-none" : ""}`}>
        {/* Hero */}
        <section id="home" className="relative">
          <div
            className="absolute inset-0 -z-10"
            aria-hidden
            style={{
              background:
                "radial-gradient(1200px 400px at 70% -10%, rgba(43,179,177,0.08), transparent 60%), radial-gradient(900px 300px at -10% 0%, rgba(35,64,142,0.10), transparent 60%)",
            }}
          />
          <div className="container mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center py-12 px-4">
            <div>
              <span className="inline-flex items-center gap-2 text-secondary font-semibold bg-[#E6FFFB] border border-[#C6F7F4] rounded-full text-[13px] px-2.5 py-1 mb-3">
                Projeto de Extensão • UESC
              </span>
              <h1 className="font-bold text-primary leading-tight text-[clamp(28px,4.0vw,40px)] mb-3 [font-family:var(--font-poppins)]">
                Bem-vindos ao Dinamizando o Ensino da Língua Inglesa na UESC!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-[60ch] mb-6">
                O Dinamizando é um projeto de extensão da UESC que oferece
                cursos de inglês para a comunidade acadêmica e externa. O
                projeto é coordenado pelo Departamento de Letras e Artes (DLA) e
                pela Pró-Reitoria de Extensão (PROEX).
              </p>
            </div>

            {/* Ilustração do Hero*/}
            <div
              aria-hidden
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-soft p-7 min-h-[260px] grid place-items-center"
            >
              <Image
                src={imgHero}
                alt="Estudantes em cadeiras ao redor da mesa estudando inglês, quadro com checkmarks"
                width={1040}
                height={600}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </section>

        {/* Grid de Cards */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {list.map((item, index) => (
                <button
                  key={index}
                  onClick={() => openModal(item)}
                  className="text-left rounded-lg transition-transform hover:-translate-y-0.5 focus:outline-none"
                  aria-label={`Abrir detalhes de ${item.title}`}
                >
                  <Card className="py-4 h-full hover:shadow-medium border border-gray-200 dark:border-gray-800">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-center min-h-[60px] flex justify-center text-center">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                      <Image
                        alt={`Imagem do card ${item.title}`}
                        className="object-cover rounded-xl w-full h-auto"
                        src={item.img}
                        width={320}
                        height={320}
                        placeholder="empty"
                        priority={index === 0}
                      />
                    </CardBody>
                  </Card>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      <DinamizandoFooter />

      {/* Modal Detalhes */}
      <Modal isOpen={isOpen} onOpenChange={onClose} size="sm">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {selectedItem?.title}
          </ModalHeader>
          <ModalBody>
            <p>{selectedItem?.description}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Fechar
            </Button>
            <Link href={selectedItem?.url}>
              <Button color="primary" onPress={onClose}>
                Ir para
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
