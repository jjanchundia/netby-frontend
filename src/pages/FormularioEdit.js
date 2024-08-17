import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import Layout from "../components/Layout"
import NotFound from "../components/NotFound"
import { axiosInstance } from '../index';

function FormularioEdit() {
    const [id, setId] = useState(useParams().id)
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [isSuccess, setIsSuccess] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const go = useNavigate();

    useEffect(() => {
        axiosInstance.get(`/api/Formulario/ObtenerFormularioPorId?id=${id}`)
            .then(function (response) {
                console.log(response);
                if (response.data.isSuccess === false) {
                    Swal.fire({
                        icon: 'error',
                        title: response.data.error,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setIsSuccess(false);
                    return;
                } else {
                    let desc = response.data.value;
                    setNombre(response.data.value.nombre);
                    setDescripcion(desc.descripcion);
                    setIsSuccess(true);
                }
            })
            .catch(function (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }, [])

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

        setIsSaving(true);
        axiosInstance.put(`/api/formulario/actualizarFormulario`, {
            id: id,
            descripcion: descripcion,
            nombre:nombre
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Formulario actualizado correctamente!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);

                go('/formulario');
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false)
            });
    }

    return (
        <Layout>
            {isSuccess === true ?
                <div className="container">
                    <h2 className="text-center mt-5 mb-3">Editar Formulario</h2>
                    <div className="card">
                        <div className="card-header">
                            <Link
                                className="btn btn-outline-info float-right"
                                to="/formulario">Ver todos Formularios
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
                                    disabled={isSaving}
                                    onClick={handleSave}
                                    type="button"
                                    className="btn btn-outline-success mt-3">
                                    Actualizar Formulario
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                : <NotFound></NotFound>}
        </Layout>
    );
}

export default FormularioEdit;