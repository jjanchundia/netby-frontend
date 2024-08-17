import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import Layout from "../components/Layout"
import { axiosInstance } from '../index';

function CamposCreate() {
    const [descripcion, setDescripcion] = useState('');
    const [isSaving, setIsSaving] = useState(false)
    const go = useNavigate();

    const handleSave = () => {

        if (descripcion === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Nombre del permiso!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        setIsSaving(true);
        axiosInstance.post('/api/tipoPermiso/', {
            Descripcion: descripcion
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Tipo de Permiso Creado Correctamente!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                setDescripcion('')
                go("/tipoPermisos")
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
            <div className="container">
                    <h2 className="text-center mt-5 mb-3">Crear Tipo de Permiso</h2>
                    <div className="card">
                        <div className="card-header">
                            <Link
                                className="btn btn-outline-info float-right"
                                to="/TipoPermisos">Ver todos los Tipos de Permisos
                            </Link>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="descripcion">Nombre o Descripción del Permiso</label>
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
                                    Crear Tipo Permiso
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
        </Layout>
    );
}

export default CamposCreate;