import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cardapio() {
  const [pratos, setPratos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarPratos() {
      try {
        const resposta = await fetch("http://localhost:8080/pratos");
        const dados = await resposta.json();
        setPratos(dados);
      } catch (error) {
        alert("Erro ao carregar pratos do servidor!");
      }
    }
    carregarPratos();
  }, []);

  function excluirPrato(id) {
    if (window.confirm("Deseja realmente excluir este prato?")) {
      fetch(`http://localhost:8080/pratos/${id}`, { method: "DELETE" })
        .then(() => setPratos(pratos.filter((p) => p.id !== id)))
        .catch(() => alert("Erro ao excluir prato!"));
    }
  }

  function editarPrato(id) {
    navigate(`/cadastro?id=${id}`);
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 2px 16px #0001" }}>
      <h2 style={{ textAlign: "center", color: "#2563eb", marginBottom: 24 }}>Cardápio</h2>
      <button
        onClick={() => navigate("/cadastro")}
        style={{
          display: "block",
          margin: "0 auto 24px auto",
          padding: "10px 24px",
          background: "#22c55e",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontWeight: "bold",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Novo Prato
      </button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {pratos.map((prato) => (
          <li
            key={prato.id}
            style={{
              background: "#f3f4f6",
              marginBottom: 16,
              padding: 16,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 1px 4px #0001",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
              {prato.imagem && (
                <img
                  src={prato.imagem}
                  alt={prato.nome}
                  style={{ width: 70, height: 70, objectFit: "cover", borderRadius: 8, border: "1px solid #ddd", background: "#fff" }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
              )}
              <div>
                <strong style={{ color: "#0ea5e9", fontSize: 18 }}>{prato.nome}</strong>
                <div style={{ fontSize: 14, color: "#64748b", marginBottom: 4 }}>
                  {prato.categoria}
                </div>
                <div style={{ fontWeight: "bold", color: "#16a34a" }}>R$ {prato.preco}</div>
                <div style={{ fontSize: 13, color: prato.disponibilidade === "Esgotado" ? "#dc2626" : "#22c55e" }}>
                  {prato.disponibilidade}
                </div>
              </div>
            </div>
            <span>
              <button
                onClick={() => editarPrato(prato.id)}
                style={{
                  marginRight: 8,
                  padding: "6px 14px",
                  background: "#fbbf24",
                  color: "#222",
                  border: "none",
                  borderRadius: 6,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Editar
              </button>
              <button
                onClick={() => excluirPrato(prato.id)}
                style={{
                  padding: "6px 14px",
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Excluir
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}