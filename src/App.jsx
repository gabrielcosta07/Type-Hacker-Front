import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Registrar from './Registrar';  

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Registrar" element={<Registrar />} />
    </Routes>
  );
}

export default App;
