import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("Disponível");
  const [imagem, setImagem] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    if (id) {
      // Buscar prato do backend pelo ID
      fetch(`https://fd-zq4w.onrender.com/pratos`)
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao buscar prato");
          return res.json();
        })
        .then((prato) => {
          setNome(prato.nome || "");
          setDescricao(prato.descricao || "");
          setPreco(prato.preco || "");
          setCategoria(prato.categoria || "");
          setDisponibilidade(prato.disponibilidade || "Disponível");
          setImagem(prato.imagem || "");
        })
        .catch(() => {
          alert("Erro ao carregar prato para edição!");
        });
    } else {
      // Limpar campos para novo prato
      setNome("");
      setDescricao("");
      setPreco("");
      setCategoria("");
      setDisponibilidade("Disponível");
      setImagem("");
    }
  }, [location.search]);

  async function salvarPrato(event) {
    event.preventDefault();

    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    const novoPrato = {
      nome,
      descricao,
      preco: parseFloat(preco),
      categoria,
      disponibilidade,
      imagem,
    };

    try {
      if (id) {
        // Atualizar prato existente (PUT)
        await fetch(`https://fd-zq4w.onrender.com/pratos`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(novoPrato),
        });
      } else {
        // Cadastrar novo prato (POST)
        await fetch("https://fd-zq4w.onrender.com/pratos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(novoPrato),
        });
      }
      navigate("/cardapio");
    } catch (error) {
      alert("Erro ao salvar prato!");
      console.error(error);
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 2px 16px #0001" }}>
      <h2 style={{ textAlign: "center", color: "#22c55e", marginBottom: 24 }}>
        {location.search.includes("id") ? "Editar Prato" : "Cadastrar Prato"}
      </h2>
      <form onSubmit={salvarPrato}>
        <div style={{ marginBottom: 16 }}>
          <label>Nome:</label>
          <input
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Descrição:</label>
          <textarea
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Preço:</label>
          <input
            type="number"
            step="0.01"
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Categoria:</label>
          <select
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="Prato Principal">Prato Principal</option>
            <option value="Bebida">Bebida</option>
            <option value="Sobremesa">Sobremesa</option>
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Disponibilidade:</label>
          <select
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
            value={disponibilidade}
            onChange={(e) => setDisponibilidade(e.target.value)}
          >
            <option value="Disponível">Disponível</option>
            <option value="Esgotado">Esgotado</option>
          </select>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label>Imagem (URL):</label>
          <input
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px 0",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: "bold",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Salvar
        </button>
      </form>
    </div>
  );
}