import React, { useEffect } from 'react'
import './style.css'
import { useState} from 'react'
import { connect } from 'react-redux'
import { submission } from '../../api/index'
import Editor from '@monaco-editor/react'
import Swal from 'sweetalert2'

function Challenges(props) {
    const challenge = props.challengeId
    // props.challenge;
    const studentId = localStorage.getItem("name") // props.id// props.studentId;
    const [code, setCode] = useState("")
    const[pressed, setPressed] = useState(false)
    
    async function handleCodeSubmission(e) {
        e.preventDefault()
        setPressed(true)
        if(challenge.id == null){
            console.log(challenge.id + "teste")
            alert("não há questões para sua posição")
        }
        else{
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
                let deu_erro = 0;
                await submission(jsonData).then( res => {
                    console.log(res.data)
                    console.log("res.data.error  " + res.data.error)
                    if(res.data.error === 'false'){
                        //mostra sucesso somente se der certo no ultimo caso de teste da questao
                        if(i == 2){
                            Swal.fire({
                                title: "Sucesso",
                                text: "Obrigado por resolver o meu problema!",
                                icon: "sucess"
                            });
                            setPressed(false)
                        }
                    }
                    else{
                        alert("Erro. Razão do erro: \n\n\n" + res.data.error)
                        setPressed(false)
                        deu_erro = 1;
                    }
                }).catch(error => {
                    Swal.fire({
                        title: "Falha",
                        html: "Erro. Razão do erro: <br> sintaxe do código incorreta <br>",
                        icon: "error"
                    });
                    setPressed(false)
                    deu_erro = 1;
                })
                if(deu_erro == 1){
                    break;
                }
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
                <button  type='submit' onClick={handleCodeSubmission} disabled={pressed} value='enviar' className='btn-questao'  > Enviar </button>
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