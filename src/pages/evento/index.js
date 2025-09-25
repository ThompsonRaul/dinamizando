import React, { useState } from "react";
import { Input, Button, Textarea, Select, SelectItem } from "@nextui-org/react";
import Head from "next/head";
import DinamizandoNavbar from "@/components/Navbar/DinamizandoNavbar";
import DinamizandoFooter from "@/components/Footer/DinamizandoFooter";

const simposiosTematicos = Array.from({ length: 26 }, (_, index) => ({
  value: String.fromCharCode(65 + index),
  label: `Simpósio ${String.fromCharCode(65 + index)}`,
}));

const categorias = [
  "Estudante de graduação",
  "Estudante de pós-graduação",
  "Estudante de educação básica",
  "Docente de educação básica",
  "Docente de ensino superior",
  "Comunidade externa",
];

const tiposInscricao = [
  "Ouvinte",
  "Participante com comunicação oral em simpósio",
];

const FormularioInscricao = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    nomeSocial: "",
    email: "",
    instituicaoVinculo: "",
    categoria: "",
    tipoInscricao: "",
    simposioTematico: "",
    tituloTrabalho: "",
    resumoCompleto: "",
    palavrasChave: "",
    referencias: "",
    autoriaPrincipal: "",
    coautoria: "",
    orientacao: "",
    vinculoInstitucionalTrabalho: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const enviarFormulario = async (e) => {
    e.preventDefault(); // Previne o recarregamento da página

    try {
      const response = await fetch("/api/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Formulário enviado com sucesso.");
        // Aqui, você pode limpar o formulário ou dar feedback ao usuário
      } else {
        console.error("Falha ao enviar formulário.");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Evento</title>
        <meta name="description" content="Página de Evento do Dinamizando" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DinamizandoNavbar />
      <div className="flex justify-center items-start min-h-screen">
        <div className="w-full max-w-2xl mt-10 mb-10">
          <form className="space-y-4" onSubmit={enviarFormulario}>
            <Input
              clearable
              bordered
              fullWidth
              placeholder="Nome completo"
              name="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={handleChange}
            />
            <Input
              clearable
              bordered
              fullWidth
              placeholder="Nome social (opcional)"
              name="nomeSocial"
              value={formData.nomeSocial}
              onChange={handleChange}
            />
            <Input
              clearable
              bordered
              fullWidth
              placeholder="E-mail"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              clearable
              bordered
              fullWidth
              placeholder="Instituição de vínculo"
              name="instituicaoVinculo"
              value={formData.instituicaoVinculo}
              onChange={handleChange}
            />
            <Select
              clearable
              bordered
              fullWidth
              label="Categoria"
              placeholder="Selecione uma categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleSelectChange}
            >
              {categorias.map((categoria) => (
                <SelectItem key={categoria} value={categoria}>
                  {categoria}
                </SelectItem>
              ))}
            </Select>
            <Select
              clearable
              bordered
              fullWidth
              label="Tipo de inscrição"
              placeholder="Selecione um tipo de inscrição"
              name="tipoInscricao"
              value={formData.tipoInscricao}
              onChange={handleSelectChange}
            >
              {tiposInscricao.map((tipo) => (
                <SelectItem key={tipo} value={tipo}>
                  {tipo}
                </SelectItem>
              ))}
            </Select>
            {formData.tipoInscricao ===
              "Participante com comunicação oral em simpósio" && (
              <>
                <Select
                  clearable
                  bordered
                  fullWidth
                  label="Simpósio temático"
                  placeholder="Selecione um simpósio temático"
                  name="simposioTematico"
                  value={formData.simposioTematico}
                  onChange={handleSelectChange}
                >
                  {simposiosTematicos.map((simpósio) => (
                    <SelectItem key={simpósio.value} value={simpósio.value}>
                      {simpósio.label}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  clearable
                  bordered
                  fullWidth
                  placeholder="Título do trabalho"
                  name="tituloTrabalho"
                  value={formData.tituloTrabalho}
                  onChange={handleChange}
                />
                <Textarea
                  bordered
                  fullWidth
                  placeholder="Resumo completo"
                  name="resumoCompleto"
                  value={formData.resumoCompleto}
                  onChange={handleChange}
                />
                <Input
                  clearable
                  bordered
                  fullWidth
                  placeholder="Palavras-chave"
                  name="palavrasChave"
                  value={formData.palavrasChave}
                  onChange={handleChange}
                />
                <Textarea
                  bordered
                  fullWidth
                  placeholder="Referências"
                  name="referencias"
                  value={formData.referencias}
                  onChange={handleChange}
                />
                <Input
                  clearable
                  bordered
                  fullWidth
                  placeholder="Autoria principal"
                  name="autoriaPrincipal"
                  value={formData.autoriaPrincipal}
                  onChange={handleChange}
                />
                <Input
                  clearable
                  bordered
                  fullWidth
                  placeholder="Coautoria (opcional)"
                  name="coautoria"
                  value={formData.coautoria}
                  onChange={handleChange}
                />
                <Input
                  clearable
                  bordered
                  fullWidth
                  placeholder="Orientação"
                  name="orientacao"
                  value={formData.orientacao}
                  onChange={handleChange}
                />
                <Input
                  clearable
                  bordered
                  fullWidth
                  placeholder="Vínculo institucional do trabalho"
                  name="vinculoInstitucionalTrabalho"
                  value={formData.vinculoInstitucionalTrabalho}
                  onChange={handleChange}
                />
              </>
            )}

            <div className="flex justify-center">
              <Button
                auto
                shadow
                color="primary"
                className="w-2/5"
                type="submit"
              >
                Enviar Inscrição
              </Button>
            </div>
          </form>
        </div>
      </div>
      <DinamizandoFooter />
    </>
  );
};

export default FormularioInscricao;
