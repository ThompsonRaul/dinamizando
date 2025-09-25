import Head from "next/head";
import { Accordion, AccordionItem } from "@nextui-org/react";
import DinamizandoNavbar from "@/components/Navbar/DinamizandoNavbar";
import DinamizandoFooter from "@/components/Footer/DinamizandoFooter";
import { useState, useEffect, useRef } from "react";

export default function DezoitoAnos() {
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && document.querySelector("nav")) {
      setNavbarHeight(document.querySelector("nav").offsetHeight);
    }
  }, []);

  const scrollToProgramacao = () => {
    const programacaoSection = document.getElementById("programacao");
    if (programacaoSection) {
      const offsetPosition = programacaoSection.offsetTop - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    event: "Vozes que ensinam e aprendem: 18 anos Dinamizando o Inglês!", // Fixed event name
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalIsAnimating, setModalIsAnimating] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCloseModal = () => {
    setModalIsAnimating(true);
    setIsModalVisible(false);

    setTimeout(() => {
      setShowModal(false);
      setModalIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        setIsModalVisible(true);
      }, 50);
    }
  }, [showModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus("submitting");
    setShowModal(false);

    try {
      const response = await fetch("/api/v1/logEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus("success");
        setFormData({
          fullName: "",
          email: "",
          event: "Vozes que ensinam e aprendem: 18 anos Dinamizando o Inglês!",
        });
        setShowModal(true);
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData.message);
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("error");
    }
  };

  return (
    <>
      <Head>
        <title>Dinamizando - 18 Anos 🎉</title>
      </Head>
      <DinamizandoNavbar />
      <div className="min-h-screen bg-yellow-50 text-center flex flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl md:text-6xl font-bold text-yellow-800 mb-4">
            🎉 18 Anos de Dinamizando! 🎉
          </h1>
          <p className="text-lg text-yellow-700 mb-8 max-w-xl">
            Estamos comemorando 18 anos de história, impacto e transformação!
          </p>

          <div className="animate-bounce mb-8">
            <svg
              onClick={scrollToProgramacao}
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-yellow-700 cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 8.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div id="programacao" className="min-h-screen bg-yellow-50 px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-yellow-700 mb-4">
            Vozes que ensinam e aprendem: 18 anos Dinamizando o Inglês!
          </h1>
          <h2 className="text-2xl font-semibold text-yellow-700 mb-4">
            Programação
          </h2>
          <p className="text-lg text-yellow-700 mb-2">
            Data: 21 de agosto de 2025
          </p>
          <p className="text-lg text-yellow-700 mb-6">
            Local: Auditório de Direito (Pav. Waldir Pires, 1° andar),
            Universidade Estadual de Santa Cruz
          </p>

          <div className="bg-yellow-100 p-6 rounded-lg shadow-md max-w-md mx-auto my-8">
            <h3 className="text-2xl font-semibold text-yellow-800 mb-4">
              Faça sua inscrição!
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div>
                <label htmlFor="fullName" className="sr-only">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Nome Completo"
                  required
                  className="w-full px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-yellow-800 placeholder-yellow-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                  required
                  className="w-full px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-yellow-800 placeholder-yellow-500"
                />
              </div>
              <button
                type="submit"
                disabled={submissionStatus === "submitting"}
                className="w-full bg-yellow-700 text-white py-2 px-4 rounded-md hover:bg-yellow-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submissionStatus === "submitting"
                  ? "Enviando..."
                  : "Inscrever-me"}
              </button>

              {submissionStatus === "error" && (
                <p className="text-red-600 mt-2">
                  Ocorreu um erro ao enviar. Por favor, tente novamente.
                </p>
              )}
            </form>
          </div>

          <Accordion aria-label="Programação do Evento" variant="bordered">
            <AccordionItem title="Manhã" className="text-left text-yellow-700">
              <p>
                08h – 08h30 | Credenciamento, Recepção e Entrega de materiais
              </p>
              <p>08h – 08h30 | Cerimônia de Abertura</p>
              <p>
                08h30 – 9h40 | Conferência de Abertura - Desafios da formação de
                professores de línguas (Profa. Dra. Ana Maria Ferreira Barcelos,
                Profa. Dra. Suellen Thomaz de Aquino Martins & Prof. Dr. Renato
                Gonçalves Peruzzo)
              </p>
              <p>
                9h40 – 10h | Conversa Aberta - Espaço para perguntas e interação
                com a palestrante
              </p>
              <p>10h – 11h | Cerimônia de Homenagens</p>
              <p>11h — 11h30 - Coffee Break de Aniversário</p>
            </AccordionItem>

            <AccordionItem title="Tarde" className="text-left text-yellow-700">
              <p>
                14h – 17h | Minicurso C@LEA: da pesquisa à publicação científica
                - Ministrada pela profa. Dra. Tatiany Pertel Sabaini Dalben
              </p>
            </AccordionItem>

            <AccordionItem title="Noite" className="text-left text-yellow-700">
              <p>
                19h - 21h | Conferência de Encerramento - E-motions and the
                emotional literacy phase (Prof. Dr. Luis Javier Pentón Herrera &
                Prof. Dr. Rodrigo Camargo Aragão)
              </p>
              <p>
                21h – 21h20 | Conversa Aberta - Espaço para perguntas e
                interação com a palestrante
              </p>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <DinamizandoFooter />

      {showModal && (
        <div
          className={`
            fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50
            transition-opacity duration-300 ease-out
            ${isModalVisible ? "opacity-100" : "opacity-0"}
          `}
        >
          <div
            className={`
              bg-yellow-100 p-8 rounded-lg shadow-xl max-w-lg w-full text-center relative
              transition-all duration-300 ease-out transform
              ${isModalVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}
            `}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold"
              aria-label="Fechar"
            >
              &times;
            </button>
            <h3 className="text-3xl font-bold text-yellow-800 mb-4">
              Inscrição Confirmada! 🎉
            </h3>
            <p className="text-lg text-yellow-700 mb-6">
              Você confirmou a sua participação no evento{" "}
              <b>Vozes que ensinam e aprendem: 18 anos Dinamizando o Inglês!</b>
              , que será realizado no dia <b>21 de agosto de 2025</b>.
            </p>
            <p className="text-lg text-yellow-700 font-semibold">
              Contamos com a sua presença!
            </p>
            <button
              onClick={handleCloseModal}
              className="mt-6 bg-yellow-700 text-white py-3 px-6 rounded-md hover:bg-yellow-800 transition duration-300 text-lg font-semibold"
            >
              Entendi!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
