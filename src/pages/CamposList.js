import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Layout from "../components/Layout"
import { axiosInstance } from '../index';

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

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Listado de Campos</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-primary"
                            to="/campos/create">Ingresar Nuevos Campos
                        </Link>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>FormularioId</th>
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
                                            <td>{campo.formularioId}</td>
                                            <td>{campo.nombreCampo}</td>
                                            <td>{campo.tipoCampo}</td>
                                            <td>{campo.esRequerido == true ? 'Si' : 'No' } </td>
                                            <td>
                                                <Link
                                                    className="btn btn-outline-success mx-1"
                                                    to={`/campos/editar/${campo.id}`}>
                                                    Editar
                                                </Link>
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
