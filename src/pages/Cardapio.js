import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cardapio() {
  const [pratos, setPratos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fd-zq4w.onrender.com/pratos")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar pratos");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setPratos(data);
        } else if (Array.isArray(data.pratos)) {
          setPratos(data.pratos);
        } else {
          setPratos([]);
        }
      })
      .catch(() => alert("Erro ao carregar cardápio!"));
  }, []);

  function removerPrato(id) {
    if (window.confirm("Tem certeza que deseja remover este prato?")) {
      fetch(`https://fd-zq4w.onrender.com/pratos/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao remover prato");
          setPratos((pratos) => pratos.filter((prato) => (prato.id || prato._id) !== id));
        })
        .catch(() => alert("Erro ao remover prato!"));
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 2px 16px #0001" }}>
      <h2 style={{ textAlign: "center", color: "#22c55e", marginBottom: 24 }}>Cardápio</h2>
      <button
        onClick={() => navigate("/cadastro")}
        style={{
          marginBottom: 24,
          padding: "10px 20px",
          background: "#2563eb",
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
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Disponibilidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pratos.map((prato) => (
            <tr key={prato.id || prato._id}>
              <td>
                {prato.imagem && (
                  <img src={prato.imagem} alt={prato.nome} style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 6 }} />
                )}
              </td>
              <td>{prato.nome}</td>
              <td>{prato.categoria}</td>
              <td>R$ {Number(prato.preco).toFixed(2)}</td>
              <td>{prato.disponibilidade}</td>
              <td>
                <button onClick={() => removerPrato(prato.id || prato._id)} style={{ color: "red" }}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}