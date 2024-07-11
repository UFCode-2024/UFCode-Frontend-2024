import React from 'react'
import './style.css'
import { useState } from 'react'
import { connect } from 'react-redux'
import { submission } from '../../api/index'
import Editor from '@monaco-editor/react'
import Swal from 'sweetalert2'

function Challenges(props) {
    const challenge = props.challengeId // props.challenge;
    const studentId = localStorage.getItem("name") // props.id// props.studentId;

    const [code, setCode] = useState("")
    const [submitBtnPressed, setSubmitBtnPressed] = useState(false);

    async function handleCodeSubmission(e) {
        setSubmitBtnPressed(true)
        e.preventDefault()

        if (challenge.id == null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Não há questões para sua posição.',
            })
            setSubmitBtnPressed(false)
        }
        else {
            const jsonData = {
                codeInput: code,
                student_id: studentId,
                problem_id: challenge.id,
                language_id: null
            }

            await submission(jsonData).then(res => {
                console.log("res.data.error  " + res.data.error)
                if (res.data.error === 'false') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Parabéns!',
                        text: 'Resposta correta!',
                        confirmButtonColor: '#4CAF50',
                        confirmButtonText: 'OK',
                    })
                    setSubmitBtnPressed(false)
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Algo deu errado...',
                        text: res.data.error,
                        confirmButtonColor: '#D92727',
                        confirmButtonText: 'Ok',
                    })
                    setSubmitBtnPressed(false)

                }
            }).catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Desapontante, jovem padawan',
                    text: error,
                    confirmButtonColor: '#D92727',
                    confirmButtonText: 'Perdão, mestre',
                })
                setSubmitBtnPressed(false)
            })
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
                <button type='submit' disabled={submitBtnPressed} value='enviar' className='btn-questao' > Enviar </button>
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