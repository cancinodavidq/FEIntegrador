import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useState} from 'react'

export function Formulario(){
	const [post,setPost] = useState ({
		nombre: '',
		descripcion: '',
		precio: ''
	})

	const handleInput = (event) =>{

		setPost({...post, [event.target.name]: event.target.value})
	}
	function handleSubmit(event){
		event.preventDefault()
		axios.post('http://localhost:8080/producto', {post})
		.then(response => console.log(response))
		.catch(err => console.log(err))

	}
	return(
		<div className='d-flex align-items-center justify-content-center vh-100 w-100'>
			<div className='w-50 text-center'>
			<h1>Registra el producto</h1><br/><br />
				<form onSubmit={handleSubmit}>
					Nombre: <input type='text' onChange={handleInput} name='nombre'></input><br/><br />
					Descripción: <input type='text' onChange={handleInput} name='descripcion'></input><br/><br />
					Precio: <input type='number' onChange={handleInput} name='precio'></input><br/><br />
					<button className='btn btn-primary'>Registrar Producto</button>
				</form>
			</div>
		</div>
	)
}
