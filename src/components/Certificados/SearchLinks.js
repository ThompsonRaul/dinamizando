import React, { useMemo, useState } from "react";
import { toDirectDownload } from "@/utils/downloads/drive";

const normalize = (str = "") =>
  String(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

// Card de resultado
const SearchResult = ({ pasta, subpasta, nome, link }) => {
  const downloadHref = toDirectDownload(link);

  return (
    <div className="group flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-[1px] hover:border-blue-100 hover:shadow-md">
      {/* Área clicável para abrir/visualizar no Drive */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir certificado: ${nome}`}
        title="Abrir no Google Drive"
        className="flex min-w-0 items-center gap-3 hover:opacity-95"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h6.5a.5.5 0 00.5-.5V13a3 3 0 013-3h4.5a.5.5 0 00.5-.5V4a2 2 0 00-2-2H4z" />
            <path d="M14 10a2 2 0 00-2 2v5l2.5-1.25L17 17v-5a2 2 0 00-2-2z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm md:text-base font-medium text-slate-800">
            {nome}
          </p>
          <p className="truncate text-xs text-slate-400">
            {pasta?.nomePasta}{" "}
            {subpasta?.nomePasta ? `• ${subpasta.nomePasta}` : ""}
          </p>
        </div>
      </a>

      {/* Ações: baixar direto e copiar link de download */}
      <div className="flex flex-shrink-0 items-center gap-2">
        <a
          href={downloadHref}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs md:text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M3 16.5A2.5 2.5 0 0 0 5.5 19h13A2.5 2.5 0 0 0 21 16.5v-.75a.75.75 0 0 0-1.5 0v.75c0 .552-.448 1-1 1h-13c-.552 0-1-.448-1-1v-.75a.75.75 0 0 0-1.5 0v.75z" />
            <path d="M12 3.75a.75.75 0 0 1 .75.75v9.19l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.748.748 0 0 1-1.06 0L7.72 12.28a.75.75 0 1 1 1.06-1.06l2.47 2.47V4.5a.75.75 0 0 1 .75-.75z" />
          </svg>
          Baixar
        </a>

        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText(downloadHref)}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs md:text-sm font-medium text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
          Copiar link
        </button>
      </div>
    </div>
  );
};

const SearchLinks = ({ dados = [] }) => {
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [pesquisaRealizada, setPesquisaRealizada] = useState(false);
  const [gatilhoBusca, setGatilhoBusca] = useState(0);

  const resultados = useMemo(() => {
    if (!pesquisaRealizada) return [];
    const q = normalize(termoPesquisa);
    if (!q) return [];

    const achados = dados.flatMap((pasta) =>
      (pasta?.subpastas ?? []).flatMap((subpasta) =>
        (subpasta?.subpastas ?? []).map((arquivo) => ({
          pasta,
          subpasta,
          nome: arquivo?.nome,
          link: arquivo?.link,
        })),
      ),
    );

    return achados.filter((item) => normalize(item.nome).includes(q));
    // eslint-disable-next-line
  }, [gatilhoBusca, pesquisaRealizada, termoPesquisa, dados]);

  const resultCount = resultados.length;

  const handlePesquisa = () => {
    setPesquisaRealizada(true);
    setGatilhoBusca((n) => n + 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handlePesquisa();
  };

  const handleClear = () => {
    setTermoPesquisa("");
    setPesquisaRealizada(false);
  };

  return (
    <div className="w-full">
      {/* Campo de busca */}
      <div className="relative">
        <label htmlFor="cert-search" className="sr-only">
          Buscar certificados
        </label>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.386a1 1 0 11-1.414 1.415l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          id="cert-search"
          type="text"
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Busque por nome ou sobrenome (tente variações com/sem acento)"
          className="w-full rounded-xl border border-slate-200 bg-white pl-12 pr-12 py-3 text-sm md:text-base text-slate-700 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
        />
        {termoPesquisa && (
          <button
            aria-label="Limpar"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
            onClick={handleClear}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Ações */}
      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs md:text-sm text-slate-500">
          {pesquisaRealizada
            ? resultCount > 0
              ? `Exibindo ${resultCount} resultado${resultCount === 1 ? "" : "s"}`
              : "Nenhum certificado encontrado."
            : `Digite e pressione Enter ou clique em Pesquisar.`}
        </p>

        <div className="flex items-center gap-2">
          {pesquisaRealizada && resultCount > 0 && (
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
              {resultCount}
            </span>
          )}
          <button
            onClick={handlePesquisa}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs md:text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            type="button"
          >
            Pesquisar
          </button>
        </div>
      </div>

      {/* Lista */}
      <div className="mt-5 space-y-3">
        {!pesquisaRealizada ? null : resultCount === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
            <div className="mb-3 rounded-full bg-white p-3 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 7h18M3 7a2 2 0 012-2h14a2 2 0 012 2M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7" />
                <path d="M8 10h.01M12 10h.01M16 10h.01M8 14h8" />
              </svg>
            </div>
            <p className="text-sm md:text-base text-slate-600">
              Nenhum certificado encontrado. Tente outra grafia (com/sem
              acentos).
            </p>
          </div>
        ) : (
          resultados.map((r, i) => (
            <SearchResult
              key={`${r.link}-${r.nome}-${i}`}
              pasta={r.pasta}
              subpasta={r.subpasta}
              nome={r.nome}
              link={r.link}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchLinks;
