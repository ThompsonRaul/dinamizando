import SearchLinks from "@/components/Certificados/SearchLinks";
import DinamizandoFooter from "@/components/Footer/DinamizandoFooter";
import DinamizandoNavbar from "@/components/Navbar/DinamizandoNavbar";
import Head from "next/head";

const dados = require("./links.json");

const CC = () => {
  return (
    <>
      <Head>
        <title>Certificados</title>
        <meta
          name="description"
          content="Página de Certificados do Dinamizando"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DinamizandoNavbar />

      <main className="min-h-screen bg-slate-50">
        {/* Cabeçalho de seção */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 md:pt-14">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-blue-600">
              Certificados
            </h1>

            <p className="max-w-2xl text-sm md:text-base text-slate-600 leading-relaxed">
              Encontre e baixe seus certificados emitidos pelo Dinamizando.
              Digite seu nome ou sobrenome no campo de busca; todos os
              certificados correspondentes disponíveis na nossa base serão
              listados para download.
            </p>
          </div>
        </section>

        {/* Card com buscador */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 md:mt-8 pb-14">
          <div className="bg-white border border-slate-100 shadow-md rounded-2xl p-4 sm:p-6 md:p-8">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-slate-800">
                Buscador de Certificados
              </h2>
              <p className="mt-1 text-xs md:text-sm text-slate-500">
                Dica: tente variações do seu nome (com e sem acentos) para
                resultados mais amplos.
              </p>
            </div>

            {/* Componente de busca/listagem */}
            <SearchLinks dados={dados} />
          </div>
        </section>
      </main>

      <DinamizandoFooter />
    </>
  );
};

export default CC;
