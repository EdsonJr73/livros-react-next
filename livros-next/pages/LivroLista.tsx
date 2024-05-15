import React, { useState, useEffect } from "react";
import { LinhaLivro } from "../componentes/LinhaLivro";
import { Livro } from "../classes/modelo/Livro";
import { Menu } from "../componentes/Menu";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const baseURL = "http://localhost:3000/api/livros";

const obterLivros = async () => {
  const response = await fetch(baseURL);
  return response.json();
};

const excluirLivro = async (codigo: number) => {
  const response = await fetch(`${baseURL}/${codigo}`, { method: "DELETE" });
  return response.ok;
};

const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    if (!carregado) {
      obterLivros().then((data) => {
        setLivros(data);
        setCarregado(true);
      });
    }
  }, [carregado]);

  const excluir = async (codigo: number) => {
    const sucesso = await excluirLivro(codigo);
    if (sucesso) {
      setCarregado(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Catálogo de Livros</title>
      </Head>
      <Menu />
      <main className="container mt-4">
        <h1>Catálogo de Livros</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="bg-dark text-white">Título</th>
              <th className="bg-dark text-white">Resumo</th>
              <th className="bg-dark text-white">Editora</th>
              <th className="bg-dark text-white">Autores</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <LinhaLivro
                key={livro.codigo}
                livro={livro}
                excluir={() => excluir(livro.codigo)}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;
