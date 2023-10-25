import '../busqueda.css';
import {useEffect, useState} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route } from 'react-router-dom';




export function Busqueda() {

  const [usuarios, setUsuarios] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState([]);

const peticionGet = async() =>{
  await axios.get("http://localhost:8080/producto")
  .then(response=>{
    setUsuarios(response.data);
    setTablaUsuarios(response.data);
    console.log(response.data)
  }).catch(error=>{
    console.log(error);
  })
}

const handleChange=e=>{
  setBusqueda(e.target.value);
  filtrar(e.target.value);

}

const filtrar=(terminoBusqueda)=>{
  var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
    if(elemento.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    || elemento.descripcion.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    
    ){
      return elemento;  
    }
  });
  setUsuarios(resultadosBusqueda);
}

useEffect(()=>{
  peticionGet();
},[])

  return (
 
    <div className="App">

      <div className='containerInput'>
          <input
            className='form-control inputBuscar'
            value={busqueda}
            placeholder='Busqueda por criterio de preferencia'
            onChange = {handleChange}
          />
          <button className='btn btn-success'>
            <FontAwesomeIcon icon={faSearch}/>

          </button>
      </div>

      <div className='table-responsive'>
        <table className='table table-sm table-bordered'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Precio</th>
            </tr>
          </thead>

          <tbody>
            {usuarios &&
            usuarios.map((usuario)=>(
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.descripcion}</td>
                <td>{usuario.precio}</td>
              </tr>

            ))}

          </tbody>

        </table>
      </div>
      
    </div>
      
  );
 
}


