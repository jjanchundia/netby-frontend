import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import Layout from "../components/Layout"
import NotFound from "../components/NotFound"
import { axiosInstance } from '../index';

function CamposEdit() {
    const [TipoFormularioList, setCamposList] = useState([])
    const [formularioId, setFormularioId] = useState(useParams().id)
    const [nombreCampo, setNombreCampo] = useState('');
    const [tipoCampo, setTipoCampo] = useState('')
    const [esRequerido, setEsRequerido] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const go = useNavigate();

    useEffect(() => {
        fetchCamposList()
    }, [])

    const fetchCamposList = () => {
        axiosInstance.get('/api/campo')
            .then(function (response) {
                setCamposList(response.data.value);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        axiosInstance.get(`/api/campo/obtenerCamposPorId/?campoId=${FormularioId}`)
            .then(function (response) {
                console.log(response);
                console.log("response");
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
                    let Permiso = response.data.value;
                    setFormularioId(Permiso.FormularioId);
                    setNombreCampo(Permiso.nombreEmpleado);
                    setTipoCampo(Permiso.apellidoEmpleado);
                    setFechaPermiso(Permiso.fechaPermiso);
                    setEsRequerido(Permiso.tipoFormularioId);

                    let fechaN = Permiso.fechaPermiso;
                    // Crear un objeto Date a partir de la cadena de fecha ISO 8601
                    const fecha = new Date(fechaN);

                    // Obtener el año, mes y día
                    const year = fecha.getFullYear();
                    const month = String(fecha.getMonth() + 1).padStart(2, "0"); // Se agrega +1 porque los meses en JavaScript son de 0 a 11
                    const day = String(fecha.getDate()).padStart(2, "0");

                    // Formatear la fecha en el formato "yyyy-mm-dd"
                    const fechaFormateada = `${year}-${month}-${day}`;
                    setFechaPermiso(fechaFormateada);
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

        if (nombres === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Nombres!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if (apellidos === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Apellidos!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if (tipoFormularioId === "") {
            Swal.fire({
                icon: 'error',
                title: 'Seleccione Tipo de Permiso!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        if (fechaPermiso === "") {
            Swal.fire({
                icon: 'error',
                title: 'Ingrese Fecha de Permiso!',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        setIsSaving(true);
        axiosInstance.put(`/api/permiso/modificarPermiso`, {
            Id: FormularioId,
            NombreEmpleado: nombres,
            ApellidoEmpleado: apellidos,
            TipoFormularioId: tipoFormularioId,
            FechaPermiso: fechaPermiso,
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Permiso actualizado correctamente!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);

                go('/permisos');
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
                    <h2 className="text-center mt-5 mb-3">Editar Permiso</h2>
                    <div className="card">
                        <div className="card-header">
                            <Link
                                className="btn btn-outline-info float-right"
                                to="/Permisos">Ver todos los Permisos
                            </Link>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="nombres">Nombres</label>
                                    <input
                                        onChange={(event) => { setNombreCampo(event.target.value) }}
                                        value={nombres}
                                        type="text"
                                        className="form-control"
                                        id="nombres"
                                        name="nombres" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="apellidos">Apellidos</label>
                                    <input
                                        onChange={(event) => { setTipoCampo(event.target.value) }}
                                        value={apellidos}
                                        type="text"
                                        className="form-control"
                                        id="apellidos"
                                        name="apellidos" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fechaPermiso">Fecha de Permiso</label>
                                    <input
                                        onChange={(event) => { setFechaPermiso(event.target.value) }}
                                        value={fechaPermiso}
                                        type="date"
                                        className="form-control"
                                        id="fechaPermiso"
                                        name="fechaPermiso" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tipoFormularioId">Tipo Permiso</label>
                                    <select
                                        id="tipoFormularioId"
                                        name="tipoFormularioId"
                                        value={tipoFormularioId}
                                        onChange={(event) => { setEsRequerido(event.target.value) }}
                                        className="form-control"
                                    >
                                        <option value="">Seleccione Tipo de Permiso</option>
                                        {TipoFormularioList.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.descripcion}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    disabled={isSaving}
                                    onClick={handleSave}
                                    type="button"
                                    className="btn btn-outline-primary mt-3">
                                    Actualizar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                : <NotFound></NotFound>}
        </Layout>
    );
}

export default CamposEdit;