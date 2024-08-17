import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Layout from "../components/Layout"
import { axiosInstance } from '../index';
import Swal from 'sweetalert2'

function CamposList() {
    const [CamposList, setCamposList] = useState([])

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

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Está seguro de eliminar este Campo?',
            text: "Acción no se podrá revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.delete(`/api/campo/eliminar/${id}`
                )
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Campo Eliminado Correctamente!',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        fetchCamposList()
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
        })
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Listado de Campos</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-primary"
                            to="/campos/create">Ingresar Nuevo Campo
                        </Link>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered" style={{textAlign: "center"}}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Formulario</th>
                                    <th>Nombre de Campo</th>
                                    <th>Tipo de Campo</th>
                                    <th>Requerido</th>
                                    <th width="240px">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CamposList.map((campo, key) => {
                                    return (
                                        <tr key={campo.id}>
                                            <td>{campo.id}</td>
                                            <td>{campo.formularioNombre}</td>
                                            <td>{campo.nombreCampo}</td>
                                            <td>{campo.tipoCampo}</td>
                                            <td>{campo.esRequerido == true ? 'Si' : 'No'} </td>
                                            <td>
                                                <Link
                                                    className="btn btn-outline-success mx-1"
                                                    to={`/campos/editar/${campo.id}`}>
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(campo.id)}
                                                    className="btn btn-outline-danger mx-1">
                                                    Eliminar
                                                </button>
                                            </td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CamposList;
