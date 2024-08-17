import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Layout from "../components/Layout"
import { axiosInstance } from '../index';
import Swal from 'sweetalert2'

function FormularioList() {
    const [FormularioList, setFormularioList] = useState([])

    useEffect(() => {
        fetchFormularioList()
    }, [])

    const fetchFormularioList = () => {
        axiosInstance.get('/api/Formulario')
            .then(function (response) {
                setFormularioList(response.data.value);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Está seguro de eliminar este Formulario?',
            text: "Acción no se podrá revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.delete(`/api/Formulario/eliminar/${id}`
                )
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Formulario Eliminado Correctamente!',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        fetchFormularioList()
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
                <h2 className="text-center mt-5 mb-3">Listado</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-primary"
                            to="/formulario/create">Ingresar Nuevo Formulario
                        </Link>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th width="240px">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {FormularioList.map((form) => {
                                    return (
                                        <tr key={form.id}>
                                            <td>{form.id}</td>
                                            <td>{form.nombre}</td>
                                            <td>{form.descripcion}</td>
                                            <td>
                                                <Link
                                                    className="btn btn-outline-success mx-1"
                                                    to={`/formulario/editar/${form.id}`}>
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(form.id)}
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

export default FormularioList;
