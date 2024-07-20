import React, { useEffect } from 'react'
import './style.css'
import { useState } from 'react'
import { connect } from 'react-redux'
import { submission } from '../../api/index'
import Editor from '@monaco-editor/react'
import Swal from 'sweetalert2'

function Challenges(props) {
    const challenge = props.challengeId
    // props.challenge;
    const studentId = localStorage.getItem("name") // props.id// props.studentId;
    const [code, setCode] = useState("")
    const [submitButtonPressed, setSubmitButtonPressed] = useState(false)

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
                const jsonData = {
                    codeInput: code,
                    student_id: studentId,
                    problem_id: challenge.id,
                    language_id: null,
                    caso_num: i
                }
                console.log(jsonData)
                await submission(jsonData).then(res => {
                    console.log(res.data)
                    if (res.data.error != 'false') {
                        casosTestesErrados++;
                        erroCasosTesteCode = res.data.error
                    }
                }).catch(error => {
                    Swal.fire({
                        title: "Falha",
                        html: "Erro. Razão do erro: " + error,
                        icon: "error"
                    });
                    setSubmitButtonPressed(false)
                })

            }
            if (casosTestesErrados == 0) {
                Swal.fire({
                    title: "2/2 casos testes corretos",
                    text: "Obrigado por resolver o meu problema!",
                    icon: "success"
                });
                setSubmitButtonPressed(false)
            } else if (casosTestesErrados == 1) {
                Swal.fire({
                    icon: 'error',
                    title: '1/2 casos teste corretos',
                    text:  erroCasosTesteCode,
                    confirmButtonColor: '#D92727',
                    confirmButtonText: 'Ok',
                })
                setSubmitButtonPressed(false)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '0/2 casos testes corretos',
                    text: erroCasosTesteCode,
                    confirmButtonColor: '#D92727',
                    confirmButtonText: 'Ok',
                })
                setSubmitButtonPressed(false)
            }
        }

    }


    const placeholder = "Ao ler a entrada, use sempre input(), sem nenhum valor dentro dos parênteses. Exemplo: int(input()) para ler um número e convertê-lo para inteiro.\nSeu programa não deve conter acentos. Caso contrário, o sistema irá apontar erro em sua solução.\nAs saídas do seu programa devem seguir o padrão exibido em 'Saída'\n\nDivirta-se, bom jogo!"





    return (
        <form onSubmit={handleCodeSubmission} id='form-code'>
            <div className='code-container'>
                <Editor
                    height='650px'
                    theme='vs-dark'
                    defaultLanguage='python'
                    value={code}
                    onChange={(value) => setCode(value)}
                />

                <input type='button' onClick={() => setCode("")} className='btn-questao' value='Limpar' />
                <button type='submit' onClick={handleCodeSubmission} disabled={submitButtonPressed} value='enviar' className='btn-questao'  > Enviar </button>
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