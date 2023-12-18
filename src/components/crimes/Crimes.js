import React, { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import NoAuthorized from '../ui/NoAuthorized';
import axios from 'axios';
import './delitos.css';

// Componente para gestionar los delitos (CRUD)
export default function Crimes() {

  // Contexto de autenticación
  const { isAdmin } = useContext(AuthContext);

  // Estado para almacenar la lista de delitos
  const [delitos, setDelitos] = useState([]);

   // Estado para almacenar la información de un nuevo delito
  const [newDelito, setNewDelito] = useState({ nombre: '', descripcion: '' });
  const [user, setUser] = useState({});
  const table = useRef();

  // Efecto para cargar la lista de delitos y los usuarios relacionados
  useEffect(() => {
    const fetchData = async () => {
      try {
        const delitosResponse = await axios.get('http://localhost:8082/api/v1/delitos');
        setDelitos(delitosResponse.data);

        // Obtener la información de los usuarios relacionados con los delitos
        const userId = delitosResponse.data.map((delito) => delito.usuarios_id);
        const usersResponse = await axios.post('localhost:8082/api/v1/usuarios', { userId });
        const usersData = usersResponse.data.reduce((acc, user) => {
          acc[user.id] = user.nombre;
          return acc;
        }, {});
        setUser(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddDelito = async (e) => {
    e.preventDefault();
    try {
      console.log('Enviando delito:', newDelito);
      await axios.post('http://localhost:8082/api/v1/delitos', newDelito);
      setNewDelito({ nombre: '', descripcion: '' });
      console.log('Delito agregado correctamente');
    } catch (error) {
      console.error('Error adding delito:', error);
    }
  };

  return (
    <>
      {isAdmin && (
         <div className="background-section">
        <div className="container">
          <div className="mb-4" style={{ margin: '50px'}}>
            <h3 className='text-center neon' style={{ margin: '10px'}}>Agregar Delito</h3>
            <form onSubmit={handleAddDelito} className="row g-3">
              <div className="col-md-6">
                <label className="form-label">
                  <strong>Nombre:</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={newDelito.nombre}
                  onChange={(e) => setNewDelito({ ...newDelito, nombre: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  <strong>Descripción:</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={newDelito.descripcion}
                  onChange={(e) => setNewDelito({ ...newDelito, descripcion: e.target.value })}
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  <strong>Agregar Delito</strong>
                </button>
              </div>
            </form>
          </div>
          <h3 className='text-center neon2'><br></br>Lista de Delitos</h3><br></br>
          <table className="table table-bordered" ref={table}>
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">NOMBRE</th>
                <th scope="col">DESCRIPCIÓN</th>
                <th scope="col">AGREGADO POR</th>
                <th scope="col">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {delitos.map((delito) => (
                <tr key={delito.id}>
                  <th scope="row" className="table-data-large">{delito.id}</th>
                  <td className="table-data-large">{delito.nombre}</td>
                  <td  className="table-data-large">{delito.descripcion}</td>
                  <td  className="table-data-large">Alexis</td>
                  <td>
                    <button
                      style={{ backgroundColor: '#26C1CE', color: 'white' }}
                    >
                      <strong>Actualizar</strong>
                    </button>
                    <button
                      style={{ backgroundColor: 'red', color: 'white' }}
                    >
                      <strong>Eliminar</strong>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}
      {!isAdmin && <NoAuthorized />}
    </>
  );
}
