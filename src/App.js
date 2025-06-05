
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Cardapio from "./pages/Cardapio";

function App() {
  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="nav-link">Inicial</Link>
        <Link to="/cadastro" className="nav-link">Cadastro de Prato</Link>
        <Link to="/cardapio" className="nav-link">Cardápio</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cardapio" element={<Cardapio />} />
      </Routes>
    </div>
  );
}

export default App;
