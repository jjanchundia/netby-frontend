import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import { axiosInstance } from '../index';

function FormularioPorId() {
    const [FormularioPorId, setFormularioPorId] = useState([])
    const idForm = useParams().id

    useEffect(() => {
        fetchFormularioPorId()
    }, [idForm])

    const fetchFormularioPorId = () => {
        axiosInstance.get(`/api/Formulario/ObtenerFormularioPorId?id=${idForm}`)
            .then(function (response) {
                setFormularioPorId(response.data.value);
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
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
                                <tr key={FormularioPorId.id}>
                                    <td>{FormularioPorId.id}</td>
                                    <td>{FormularioPorId.nombre}</td>
                                    <td>{FormularioPorId.descripcion}</td>
                                    <td>
                                        <Link
                                            className="btn btn-outline-success mx-1"
                                            to={`/formulario/editar/${FormularioPorId.id}`}>
                                            Editar
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default FormularioPorId;
