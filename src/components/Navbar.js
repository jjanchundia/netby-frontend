import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../index';

export default function Navbar() {
    const go = useNavigate();
    const [formularios, setFormularios] = useState([]);
    // const [formularioSeleccionado, setFormularioSeleccionado] = useState(null);

    useEffect(() => {

        axiosInstance.get('/api/Formulario/')
            .then(function (response) {
                setFormularios(response.data.value);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    // const cargarFormulario = (id) => {
    //     axiosInstance.get(`/api/formulario/${id}`)
    //         .then(response => setFormularioSeleccionado(response.data))
    //         .catch(error => console.error(error));
    // };

    const handleSelectChange = (e) => {
        const formularioId = e.target.value;
        if (formularioId) {
            go(`/formulario/${formularioId}`); // Navega a la ruta con el ID del formulario seleccionado
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Home</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse col-md-3" id="navbarSupportedContent">
                        {/* <select className="form-select" aria-label="Seleccione un Formulario" onChange={(e) => handleSelectChange(e)}>
                            <option value="" disabled selected>Opciones Formularios</option>
                            {formularios.map(formulario => (
                                <option key={formulario.id} value={formulario.id}>
                                    {formulario.nombre}
                                </option>
                            ))}
                        </select> */}
                        <Link
                            className="btn btn-outline-primary mx-1"
                            to={`/formulario`}>
                            Formularios
                        </Link>
                    </div>
                    <div className="collapse navbar-collapse col-md-3" id="navbarSupportedContent">
                        {/* <select className="form-select" aria-label="Seleccione un Formulario" onChange={(e) => handleSelectChange(e)}>
                            <option value="" disabled selected>Opciones Campos</option>
                            {formularios.map(formulario => (
                                <option key={formulario.id} value={formulario.id}>
                                    {formulario.nombre}
                                </option>
                            ))}
                        </select> */}
                        <Link
                            className="btn btn-outline-success mx-1"
                            to={`/campos`}>
                            Campos
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}