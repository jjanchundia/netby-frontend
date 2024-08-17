import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import Layout from "../components/Layout"
import { axiosInstance } from '../index';

function FormularioCreate() {
    const [TipoFormularioList, setTipoFormularioList] = useState([])
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('')
    const go = useNavigate();

    const handleSave = () => {

        if (nombre === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese nombre!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if (descripcion === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese descripcion!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }
        
        axiosInstance.post('/api/formulario/register', {
            Nombre: nombre,
            Descripcion: descripcion,
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Formulario Creado Correctamente!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setNombre('')
                setDescripcion('')
                // go("/")
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Crear Nuevo Formulario</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/Formulario">Ver todos los Formularios
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    onChange={(event) => { setNombre(event.target.value) }}
                                    value={nombre}
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    name="nombre" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="descripcion">Descripcion</label>
                                <input
                                    onChange={(event) => { setDescripcion(event.target.value) }}
                                    value={descripcion}
                                    type="text"
                                    className="form-control"
                                    id="descripcion"
                                    name="descripcion" />
                            </div>
                            <button
                                onClick={handleSave}
                                type="button"
                                className="btn btn-outline-primary mt-3">
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default FormularioCreate;