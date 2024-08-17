import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NotFound from "./components/NotFound"
import FormularioList from "./pages/FormularioList"
import FormularioCreate from "./pages/FormularioCreate"
import FormularioEdit from './pages/FormularioEdit'
import './App.css';
import CamposList from './pages/CamposList'
import CamposCreate from './pages/CamposCreate'
import CamposEdit from './pages/CamposEdit'

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<FormularioList />} />
        <Route exact path="/formulario" element={<FormularioList />} />
        <Route exact path="/formulario/create" element={<FormularioCreate />} />
        <Route exact path="/formulario/editar/:id" element={<FormularioEdit />} />
        <Route path="*" element={<NotFound />} />
        <Route exact path="/campos" element={<CamposList />} />
        <Route exact path="/campos/create" element={<CamposCreate />} />
        <Route exact path="/campos/editar/:id" element={<CamposEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
