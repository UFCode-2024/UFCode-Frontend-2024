import React, { useEffect } from 'react'
import './style.css'
import { useState } from 'react'
import { connect } from 'react-redux'
import { submission } from '../../api/index'
import { userProblem, findUserProblemByUserAndProblem, updateUserLevel } from '../../api/index';
import Editor from '@monaco-editor/react'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'


function Challenges(props) {
    const history = useHistory();
    const challenge = props.challengeId
    // props.challenge;
    const userId = sessionStorage.getItem('userId')
    const studentId = localStorage.getItem("name") // props.id// props.studentId;
    const [code, setCode] = useState("")
    const [submitButtonPressed, setSubmitButtonPressed] = useState(false)

    const [isThereError, setIsThereError] = useState(false)

    async function handleCodeSubmission(e) {
        e.preventDefault()
        setSubmitButtonPressed(true)

        if (challenge.id == null) {
            console.log(challenge.id + "teste")
            Swal.fire({
                title: "Nada por aqui",
                text: "Nenhuma questão para sua posição",
                icon: "question"
            })
            setSubmitButtonPressed(false)
        }
        else {
            let casosTestesErrados = 0;
            let erroCasosTesteCode = ''
            //loop para rodar todos os casos de teste de uma questao. Nesse caso, as questoes possuem dois casos de teste.
            for (let i = 1; i <= 2; i++) {
                setIsThereError(false)
                const jsonData = {
                    codeInput: code,
                    student_id: studentId,
                    problem_id: challenge.id,
                    language_id: null,
                    caso_num: i
                }
                console.log('data', jsonData)
                await submission(jsonData).then(res => {
                    console.log('SUBMISSION', res.data)
                    if (res.data.error != 'false') {
                        casosTestesErrados++;
                        erroCasosTesteCode = res.data.error
                    }
                }).catch(error => {
                    if (i === 2) {
                        Swal.fire({
                            title: "Falha",
                            html: "Erro. Razão do erro: " + error,
                            icon: "error",
                            footer: "É possível que o tempo limite de execução tenha sido atingido."
                        });
                        setSubmitButtonPressed(false)
                    }
                    setIsThereError(true)
                    casosTestesErrados += 42; //42 é easteregg - caso não mudasse o valor desta variável, seria computado como sucesso 2/2 na checagem abaixo.
                })

            }
            if (isThereError === false) {
                if (casosTestesErrados == 0) {

                    //sessão para armazenar questões feitas
                    findUserProblemByUserAndProblem(String(userId), challenge.id)
                    .then(response => {
                        if (response.data) {
                            console.log(challenge.difficultyId);
                            console.log("Usuário já respondeu essa questão anteriormente");
                            console.log(typeof challenge.difficultyId);
                        }
                    })
                    .catch(error => {
                        if (error.response && error.response.status === 404) {
                            // Se não encontrar (der 404), cria o problema do usuário (pois significa que nunca tinha feito a questão)
                            const data = {
                                id_user: String(userId),
                                id_problem: challenge.id
                            };
                
                            userProblem(data)
                                .then(response => {
                                    console.log("Questão registrada", response.data);
                                    //atualizacao do xp
                                    updateUserLevel(userId, challenge.difficultyId)
                                        .then(response => {
                                            const xpUser = response.data.xp_user;
                                            sessionStorage.setItem('userXp', xpUser);
                                            console.log("XP aumentado com sucesso:", response.data);
                                        })
                                        .catch(error => {
                                            console.error("Erro ao aumentar XP do usuário:", error.response.data);
                                        });
                                })
                                .catch(createError => {
                                    console.error("Error registrar questao", createError);
                                });
                        } else {
                            console.error("Error finding user problem:", error);  // Outro erro ao tentar encontrar o problema
                        }
                    });

                    Swal.fire({
                        title: "2/2 casos testes corretos",
                        text: "Obrigado por resolver o meu problema!",
                        icon: "success"
                    }).then(() => {
                        history.push('/game');
                    });
                    setSubmitButtonPressed(false);


                } else if (casosTestesErrados == 1) {
                    Swal.fire({
                        icon: 'error',
                        title: '1/2 casos teste corretos',
                        text: erroCasosTesteCode,
                        confirmButtonColor: '#D92727',
                        confirmButtonText: 'Ok',
                    })
                    setSubmitButtonPressed(false)
                } else if (casosTestesErrados == 2) {
                    Swal.fire({
                        icon: 'error',
                        title: '0/2 casos testes corretos',
                        text: erroCasosTesteCode,
                        confirmButtonColor: '#D92727',
                        confirmButtonText: 'Ok',
                    })
                    setSubmitButtonPressed(false)
                } else {
                    setSubmitButtonPressed(false)
                }
            }
        }

    }


    const placeholder = "Ao ler a entrada, use sempre input(), sem nenhum valor dentro dos parênteses. Exemplo: int(input()) para ler um número e convertê-lo para inteiro.\nSeu programa não deve conter acentos. Caso contrário, o sistema irá apontar erro em sua solução.\nAs saídas do seu programa devem seguir o padrão exibido em 'Saída'\n\nDivirta-se, bom jogo!"





    return (
        <form onSubmit={handleCodeSubmission} id='form-code'>
            <div className='code-container'>
                <Editor
                    height='600px'
                    theme='vs-dark'
                    defaultLanguage='python'
                    value={code}
                    onChange={(value) => setCode(value)}
                />
                <div className='buttons'>
                    <input type='button' onClick={() => setCode("")} className='btn-questao' value='Limpar' />
                    <button type='submit' onClick={handleCodeSubmission} disabled={submitButtonPressed} value='enviar' className='btn-questao'  > Enviar </button>
                </div>
            </div>
        </form>
    )
}

function mapStateToProps(state) {
    return {
        tiles: state.map.tiles,
        position: state.player.position,
        id: state.player.id,
        challengeId: state.quest
    }
}

export default connect(mapStateToProps)(Challenges)