import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import Layout from "../components/Layout"
import { axiosInstance } from '../index';

function CamposCreate() {
    const [tipoDeFormulario, setTipoDeFormulario] = useState([])
    const [formularioId, setFormularioId] = useState('');
    const [nombreCampo, setNombreCampo] = useState('');
    const [tipoCampo, setTipoCampo] = useState('');
    const [esRequerido, setEsRequerido] = useState('');
    const [isSaving, setIsSaving] = useState(false)
    const go = useNavigate();

    useEffect(() => {
        fetchTipoFormularioList()
    }, [])

    const fetchTipoFormularioList = () => {
        axiosInstance.get('/api/formulario')
            .then(function (response) {
                setTipoDeFormulario(response.data.value);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleSave = () => {

        if (formularioId === "") {
            Swal.fire({
                icon: 'error',
                title: 'Seleccione Formulario!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if (nombreCampo === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese nombre de campo!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if (tipoCampo === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese el tipo de campo!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if (esRequerido === "") {
            Swal.fire({
                icon: 'error',
                title: 'Seleccione opción requerida!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        let esRequeridoBool = esRequerido === "1" ? true : false;

        setIsSaving(true);
        axiosInstance.post('/api/campo/register', {
            formularioId: formularioId,
            nombreCampo: nombreCampo,
            tipoCampo: tipoCampo,
            esRequerido: esRequeridoBool
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Campo Creado Correctamente!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                setNombreCampo('')
                go("/campos")
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
                <h2 className="text-center mt-5 mb-3">Crear Campos</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/campos">Ver todos los Campos
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="nombreCampo">Formulario</label>
                                <select
                                    id="formularioId"
                                    name="formularioId"
                                    value={formularioId}
                                    onChange={(event) => { setFormularioId(event.target.value) }}
                                    className="form-control"
                                >
                                    <option value="">Seleccione el Tipo de Formulario</option>
                                    {tipoDeFormulario.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="nombreCampo">Nombre del Campo</label>
                                <input
                                    onChange={(event) => { setNombreCampo(event.target.value) }}
                                    value={nombreCampo}
                                    type="text"
                                    className="form-control"
                                    id="nombreCampo"
                                    name="nombreCampo" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tipoCampo">Tipo de Campo</label>
                                <input
                                    onChange={(event) => { setTipoCampo(event.target.value) }}
                                    value={tipoCampo}
                                    type="text"
                                    className="form-control"
                                    id="tipoCampo"
                                    name="tipoCampo" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nombreCampo">Es Requerido</label>
                                <select
                                    id="esRequerido"
                                    name="esRequerido"
                                    value={esRequerido}
                                    onChange={(event) => { setEsRequerido(event.target.value) }}
                                    className="form-control"
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="1">Sí</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-outline-success mt-3">
                                Crear Campo
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CamposCreate;