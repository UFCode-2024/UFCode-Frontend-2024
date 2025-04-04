import React, { useEffect, useState } from "react";
import "./style.css";
import MainGame from "../../components/MainGame";
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { listCourses, listModules, findUserLevel, userLevel } from '../../api/index'
import { listProblems } from '../../api'
import Swal from 'sweetalert2'
import $ from 'jquery'
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';


function MainPage() {
    // inicio da área login google 
	const handleSuccessGoogle = (credentialResponse) => {
		const userObject = jwtDecode(credentialResponse.credential);
		sessionStorage.setItem('token', credentialResponse.credential);
		
		sessionStorage.setItem('userName', userObject.name);
		setUserId(userObject.sub);
		sessionStorage.setItem('userId', userObject.sub);
		sessionStorage.setItem('userPicture', userObject.picture);
		setIsLoggedIn(true);

		//registrar o xp do usuario
		findUserLevel(String(userObject.sub))
			.then(response => {
				if (response.data) {
					console.log("Usuário já tem um nível atribuído.");
					console.log(response.data.xp);
					sessionStorage.setItem('userXp', response.data.xp);
				}
			})
			.catch(error => {
				if (error.response && error.response.status === 404) {
					const data = {
						id_user: String(userObject.sub),
						name_user: userObject.name,
						xp_user: 0
					};

					userLevel(data)
						.then(response => {
							console.log("Nível do usuário criado com sucesso", response.data);
							sessionStorage.setItem('userXp', 0);
						})
						.catch(createError => {
							console.error("Erro ao criar o nível do usuário", createError);
						});
				} else {
					console.error("Erro ao buscar nível do usuário:", error);
				}
			});
		

	};
	
	const handleErrorGoogle = () => {
		console.log('Falha no Login');
	};

	const handleLogout = () => {
		googleLogout();
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('userId');
		sessionStorage.removeItem('userXp');
		sessionStorage.removeItem('userName');
		sessionStorage.removeItem('userPicture');
		setIsLoggedIn(false);
		setName('');
		setUserId('');
		setProfilePic('');
	};

	// permanência do login
	useEffect(() => {
		const token = sessionStorage.getItem('token');
		if (token) {
			try {
				const userObject = jwtDecode(token);
				setName(userObject.name);
				setUserId(userObject.sub);
				setProfilePic(userObject.picture);
				setIsLoggedIn(true);
		  	} catch (error) {
				console.error('Token inválido ou expirado:', error);
				sessionStorage.removeItem('token');
				setIsLoggedIn(false);
		  	}
		}
	}, []);
	// fim da área login google

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
	const [name, setName] = useState('')
	const [userId, setUserId] = useState('')
	const [userXp, setUserXp] = useState(null);
	const [profilePic, setProfilePic] = useState('')
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		const xp = sessionStorage.getItem('userXp');
		if (xp !== null) {
		  setUserXp(Number(xp));
		}
	  }, []);

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

		/*if(name.trim() === ""){
			Swal.fire({
				title: "Erro",
				text: "Preencha seu nome corretamente",
				icon: "warning",
			});
			return
		} login com o google */

		if(isLoggedIn == false){
			Swal.fire({
				title: "Erro",
				text: "Faça Login para jogar",
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
		
		localStorage.setItem("name", name)
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
							<div className="form-group mb-3">
								{isLoggedIn ? (
									<div>
										<div className="profile-container mb-4">
											<img className="profile-pic" src={profilePic} alt="Profile" />
											<div className="profile-details">
												<h2>{name}</h2>
												<div className="level-info">
													<span>lvl: {Math.floor(userXp / 5)}</span>
													<span> xp: {userXp  % 5}/5</span>
												</div>
												<button className="logout-button" onClick={handleLogout}>Sair</button>
											</div>
										</div>
										<select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
											labelId="course"
											id="select"
											value={course}
											{...register("course", {
												required: "Required",
											})}
											onChange={(event) => setCourse(event.target.value)}
											label="course">
											<option value='any'>Selecione a área de estudo</option>
											{cursos.map(x => (
												<option key={x.id} value={x.id}>{x.name}</option>
											))}
										</select>
										<select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
											labelId="module"
											id="select"
											value={module}
											{...register("module", {
												required: "Required",
											})}
											onChange={(event) => setModule(event.target.value)}
											label="module">
											<option value='any'>Selecione o módulo</option>
											{modulos.map(x => (
												<option key={x.id} value={x.id}>{x.name}</option>
											))}
										</select>
										<button type="submit" className="form-control form-control-lg mb-4 btn btn-lg btn-block btn-primary">Jogar</button>
									</div>
								) : (
									<div className="google-button-container mb-4">
										<GoogleLogin
											onSuccess={handleSuccessGoogle}
											onError={handleErrorGoogle}
											buttonText="Entrar com Google"
										/>
									</div>
								)}
								<div className="form-control form-control-lg mb-3 text-box nome-section">
									Todos os códigos utilizados no jogo são baseados em problemas reais de programação, responda-os usando Python.
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</MainGame>
	);
}

export default MainPage;

