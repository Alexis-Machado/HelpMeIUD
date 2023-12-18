import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { obtenerTodos } from '../../services/public/DelitoService';
import { crear } from '../../services/private/CasoService';
import Swal from 'sweetalert2';
import { messages } from '../../utils/messages';
import '../../index.css';
import MapEdit from '../maps/MapEdit';

// Componente para reportar un caso
export default function Reportar() {

  const [loading, setLoading] = useState(false);

  // Contexto de autenticación
  const { user: { user } } = useContext(AuthContext);

  // Estado para almacenar la lista de delitos
  const [delitos, setDelitos] = useState([]);

  // Estado para manejar errores de validación
  const [errors, setErrors] = useState({
    mapa: '',
    descripcion: '',
    delito: ''
  });

   // Estado para almacenar la información del caso
  const [caso, setCaso] = useState({
    latitud: 0,
    longitud: 0,
    altitud: 0,
    visible: true,
    descripcion: '',
    urlMap: '',
    rmiUrl: '',
    usuario_id: user.id_usuario,
    delito_id: 0
  });

   // Cargar la lista de delitos al montar el componente
  useEffect(() => {
    async function cargarDelitos() {
      const response = await obtenerTodos();
      const body = await response.data;
      setDelitos(body);
    }
    cargarDelitos();
  }, []);

   // Manejar el evento de hacer clic en el mapa
  const _onClickMap = (e, mapSt) => {

    const location = { lat: e.lat, lng: e.lng };

    caso.latitud = location.lat;
    caso.longitud = location.lng;
    caso.rmiUrl = mapSt.rmiUrl
    caso.urlMap = mapSt.mapUrl

    setCaso({ ...caso });

    setTimeout(() => {
      console.log(caso)
    }, 1000)
  }


   // Validar el formulario antes de enviar
  const handleValidation = () => {
    let errors = {};
    let isValid = true;
    if (!caso.descripcion) {
      isValid = false;
      errors["descripcion"] = "Es Necesario Proporcionar una Descripción";
    } else {
      errors["descripcion"] = "";
    }
    //mapa
    if (!caso.urlMap) {
      isValid = false;
      errors["mapa"] = "Marque un Punto en el Mapa";
    } else {
      errors["mapa"] = "";
    }
    // delito
    if (!caso.delito_id) {
      isValid = false;
      errors["delito"] = "Es Necesario Seleccionar un Delito";
    } else {
      errors["delito"] = "";
    }
    setErrors({ ...errors });
    return isValid;
  }

   // Enviar el registro del caso
  const sendRegister = e => {
    e.preventDefault();
    if (handleValidation()) {
      setLoading(true);
      crear(caso)
        .then(r => {
          console.log(r);
          setCaso({
            latitud: 0,
            longitud: 0,
            altitud: 0,
            descripcion: '',
            urlMap: '',
            rmiUrl: '',
            delito_id: 0
          });
          setLoading(false);
          return Swal.fire('OK', messages.REG_CASO, 'success');
        })
        .catch(e => {
          setLoading(false);
          console.log(e);
          return Swal.fire('Error', messages.ERROR_REGISTRO_CASO, 'error');
        });
    }
  };

   // Manejar el cambio en los campos del formulario
  const handleChange = e => {
    setCaso({
      ...caso,
      [e.target.name]: e.target.value
    });
  };

  // Manejar el cambio en la selección del delito
  const handleChangeDelito = e => {
    setCaso({
      ...caso,
      delito_id: e.target.value,
    });
  };

  return (
    <div className="container" style={{ margin: '145px' }}>
      <div className="col-md-12 col-lg-12 mb-6">
        <h1 className="d-none">1</h1>
        <h2 className="d-none">2</h2>
        <h3 className="d-none">3</h3>
        <form
          className="needs-validation"
          onSubmit={sendRegister}
        >
          <div className="row clear">
            <div className="col-12">
              <div className="invalid-feedback d-block">
                {errors.mapa}
              </div>
              <div style={{ height: '100vh', width: '100%' }}>
                <MapEdit onClickMap={_onClickMap} />
              </div>
              <div className="invalid-feedback d-block">
                {errors.mapa}
              </div>
            </div>
          </div><br></br>
          <h4 className="mb-3 text-center neon3">Reportar Caso</h4>
          <div className="row my-4">
            <div className="col-sm-6 col-lg-6">
              <label htmlFor="delito" className="form-label">Delito<span className="text-muted"></span></label>
              <select
                className="form-control"
                id="delito_id"
                required=""
                name="delito_id"
                onChange={handleChangeDelito}
              >
                <option value=""> Seleccione el Delito</option>
                {delitos.map((d) => <option key={d.id + 1} value={d.id}>{d.nombre}</option>)}
              </select>
              <div className="invalid-feedback d-block">
                {errors.delito}
              </div>
            </div>
            <div className="col-sm-6">
              <label htmlFor="nombre" className="form-label">Descripción<span className="text-muted"></span></label>
              <input
                type="text"
                className="form-control"
                id="descripcion"
                placeholder="Descripción corta"
                required=""
                name="descripcion"
                value={caso.descripcion}
                onChange={handleChange}
              />
              <div className="invalid-feedback d-block">
                {errors.descripcion}
              </div>
            </div>
            <hr className="my-1" />

            <div className="d-flex justify-content-center align-items-center">
              <button
                disabled={loading ? 1 : 0}
                className="btn btn-primary btn-block button-standard"
                type="submit"
              >
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  >
                  </span>
                )}
                <strong>Guardar</strong>
              </button>
            </div>

          </div>
        </form>

      </div>
    </div>
  );

}