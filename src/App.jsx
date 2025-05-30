import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import Jogo from "./pages/Jogo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Registrar" element={<Registrar />} />
      <Route path="/Jogo" element={<Jogo />} />
    </Routes>
  );
}

export default App;
