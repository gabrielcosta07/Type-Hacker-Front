import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import Jogo from "./pages/Jogo";
import Liga from "./pages/Liga";
import Ranking from "./pages/Ranking";
import Historico from "./pages/Historico";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Registrar" element={<Registrar />} />
      <Route path="/Jogo" element={<Jogo />} />
      <Route path="/Liga" element={<Liga />} />
      <Route path="/Ranking" element={<Ranking />} />
      <Route path="/Historico" element={<Historico />} />
    </Routes>
  );
}

export default App;
