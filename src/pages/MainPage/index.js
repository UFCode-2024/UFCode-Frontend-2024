import React, { useEffect, useState } from "react";
import "./style.css";
import MainGame from "../../components/MainGame";
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { listCourses, listModules } from '../../api/index'
import { listProblems } from '../../api'
import Swal from 'sweetalert2'
import $ from 'jquery'


function MainPage() {

	$(function() {
        $(window).on('popstate', function () {
            window.location.reload(true);
        });
    });

	const history = useHistory();
	const { register, handleSubmit } = useForm()
	const [cursos, setCurso] = useState([])
	const [modulos, setModulo] = useState([])
	const [course, setCourse] = useState('any')
	const [module, setModule] = useState('any')

	useEffect(() => {
		listCourses().then(response => {
			var item = response.data
			item.sort((a, b) => {
				var x = a.name; var y = b.name
				return ((x < y) ? -1 : ((x > y) ? 1 : 0))
			})
			setCurso(item)
		}).catch(error => console.log("test cursos: failed!", error))
	}, [])

	useEffect(() => {
		listModules().then(response => {
			setModulo(response.data)
			console.log(response.data)
		}).catch(error => console.log("test Modulos: failed!", error))
	}, [])

	const onSubmit = (game) => {

		if(game.name.trim() === ""){
			Swal.fire({
				title: "Erro",
				text: "Preencha seu nome corretamente",
				icon: "warning",
			});
			return
		}

		if(game.course === 'any' || game.module === 'any'){
			Swal.fire({
				title: "Erro",
				text: "Selecione um curso e um módulo",
				icon: "warning",
			});
			return
		}

		localStorage.setItem("name", game.name)
		localStorage.setItem("course", game.course)
		localStorage.setItem("module", game.module)

		listProblems(game.course, game.module).then(res => {
			if (res.data.length !== 0) {
				history.push('/game')
			} else {
				Swal.fire({
					title: "Erro",
					text: "Não existem problemas cadastrados para esse curso e módulo",
					icon: "error",
				  });
			}

		}).catch(error => {
			history('/')
		})

	}
	return (
		<MainGame>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="container overflow-hidden font-weight-bold">
					<div className="row justify-content-center">
						<div className="col-md-4 p-3">
							<input class="form-control form-control-lg mb-3" type="text" placeholder="Nome do jogador" aria-label=".form-control-lg example"
								{...register("name")}
							/>
							<select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
								labelId="course"
								id="select"
								value={course}
								{...register("course", {
									required: "Required",
								})}
								onChange={(event) => setCourse(event.target.value)}
								label="course">

								<option value='any'>Selecione a área de estudo</option>

								{cursos.map(x => {
									return <option value={x.id}>{x.name}</option>
								})}
							</select>
							<select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
								labelId="module"
								id="select"
								value={module}
								{...register("module", {
									required: "Required",
								})}
								onChange={(event) => setModule(event.target.value)}
								label="module">

								<option value='any'>Selecione o módulo</option>

								{modulos.map(x => {
									return <option value={x.id}>{x.name}</option>
								})}
							</select>
							<button type="submit" className="form-control form-control-lg mb-3 btn btn-lg btn-block btn-primary">Jogar</button>
								<div className="form-control form-control-lg mb-3 text-box nome-section">
							Todos os códigos utilizados no jogo são baseados em problemas reais de programação, responda-os usando python.
							</div>
						</div>

					</div>
				</div>
			</form>
		</MainGame>
	);
}

export default MainPage;
