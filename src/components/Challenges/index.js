import React from 'react'
import './style.css'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { dispatchQuest } from '../GameChallenge/dispatchQuest'
import { listProblems } from '../../api'
import { QUEST } from '../../config/constants'
import { useHistory } from 'react-router-dom'

function Challenges(props) {
    // const history = useHistory();

    // const initialState = {
    //     id: null,
    //     name: null,
    //     description: null,
    //     input: null,
    //     expectedOutput: null,
    //     houseId: null,
    //     positionX: null,
    //     positionY: null,
    //     difficultyId: null,
    //     courses: null,
    //     modules: null
    // }

    // const constructionState = {
    //     id: null,
    //     name: "Questão em Construção",
    //     description: "Olá, ficamos felizes que tenha chegado até aqui, no momento nossa casa ainda está em construção, em breve traremos novos desafios para você :)",
    //     input: null,
    //     expectedOutput: null,
    //     houseId: null,
    //     positionX: null,
    //     positionY: null,
    //     difficultyId: null,
    //     courses: null,
    //     modules: null

    // }

    // const [currentQuest, setCurrentQuest] = useState(initialState)
    // const [questList, setQuestList] = useState([])
    // const login = localStorage.getItem("name")
    // const _course = localStorage.getItem("course")
    // const _module = localStorage.getItem("module")
    // const [positionQuest, setPositionQuest] = useState(0)

    // useEffect(() => {
    //     listProblems(_course, _module).then(res => {
    //         setQuestList(res.data)
    //         if (res.data.length === 0)
    //             history.push('/')
    //         console.log(res.data)
    //     }).catch(error => {
    //         console.log(error)
    //     })
    // }, [login])


    // const changeProblem = (_currentQuest, total) => {
    //     if (positionQuest == total) {
    //         setPositionQuest(0)
    //     } else {
    //         setPositionQuest(positionQuest + 1)

    //         console.log(_currentQuest)
    //     }
    //     return _currentQuest = questList[positionQuest]
    //     console.log(positionQuest)
    // }

    // const haveQuestion = () => {
    //     if (props.position[0] === 512 && props.position[1] === 160)
    //         return true
    //     if (props.position[0] === 160 && props.position[1] === 352)
    //         return true
    //     if (props.position[0] === 576 && props.position[1] === 416)
    //         return true
    //     if (props.position[0] === 192 && props.position[1] === 608)
    //         return true
    //     if (props.position[0] === 608 && props.position[1] === 608)
    //         return true
    //     else
    //         return false
    // }

    // useEffect(() => {

    //     let _currentQuest = null
    //     const total = questList.length

    //     if (props.position[0] === 512 && props.position[1] === 160) {
    //         if (questList[0] != null) {
    //             _currentQuest = questList[0]
    //         } else {
    //             _currentQuest = constructionState
    //         }
    //         console.log(_currentQuest)
    //     }
    //     if (props.position[0] === 160 && props.position[1] === 352) {
    //         if (questList[1] != null) {
    //             _currentQuest = questList[1]
    //         } else {
    //             _currentQuest = constructionState
    //         }
    //         console.log(_currentQuest)
    //     }
    //     if (props.position[0] === 576 && props.position[1] === 416) {
    //         if (questList[2] != null) {
    //             _currentQuest = questList[2]
    //         } else {
    //             _currentQuest = constructionState
    //         }
    //         console.log(_currentQuest)

    //     }
    //     if (props.position[0] === 192 && props.position[1] === 608) {
    //         if (questList[3] != null) {
    //             _currentQuest = questList[3]
    //         } else {
    //             _currentQuest = constructionState
    //         }
    //         console.log(_currentQuest)

    //     }
    //     if (props.position[0] === 608 && props.position[1] === 608) {
    //         if (questList[4] != null) {
    //             _currentQuest = questList[4]
    //         } else {
    //             _currentQuest = constructionState
    //         }
    //         console.log(_currentQuest)

    //     }
    //     // existe alguma quest na posicao atual?
    //     // se sim, seta a quest.
    //     if (_currentQuest != null) {
    //         console.log("Current quest??")
    //         setCurrentQuest(_currentQuest)
    //         props.dispatchQuest(QUEST, _currentQuest)
    //     } else {
    //         setCurrentQuest(initialState)
    //         props.dispatchQuest(QUEST, initialState)
    //     }
    // }, [props.position[0], props.position[1]])


    //funcao para obter cada caso de teste individual (nesse caso teremos 2 casos de teste por problema)
    function separarCasos(dados) {
        const linhas = dados.split('\n');
        const metade = Math.ceil(linhas.length / 2);
        const caso1 = linhas.slice(0, metade).join('\n');
        const caso2 = linhas.slice(metade).join('\n');
        return { caso1, caso2 };
    }


    const renderQuest = () => {

        //separando os casos de teste para mostrar so o primeiro (exemplo de input/output para uma questao)
        let input1, expOut1;

        // if (currentQuest.input != null) {
        //     const { caso1: input1Temp, caso2: input2 } = separarCasos(currentQuest.input);
        //     const { caso1: expOut1Temp, caso2: expOut2 } = separarCasos(currentQuest.expectedOutput);
        //     input1 = input1Temp;
        //     expOut1 = expOut1Temp;
        // } else {
        //     input1 = currentQuest.input;
        //     expOut1 = currentQuest.expectedOutput;
        // }

        return (
            <span className='text'>
                <div className='gridDesc'>
                    <h3 className="boxTitle">Descrição da Missão</h3>
                    <span className='info'>
                        description
                    </span>
                </div>
                <div className='input-output'>
                <div className='gridEntrada box'>
                    <h3 className="boxTitle">Exemplo de Input</h3>
                    <span className='info'>
                        {input1}
                    </span>
                </div>
                <div className='gridSaida box'>
                    <h3 className="boxTitle">Exemplo de Output</h3>
                    <span className='info'>
                        {expOut1}
                    </span>
                </div>
                </div>
            </span>
        )
    }

    return (
        renderQuest()
    )
}

// function mapStateToProps(state) {
//     return {
//         tiles: state.map.tiles,
//         position: state.player.position,
//         id: state.player.id,
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         dispatchQuest(type, quest) {
//             const action = dispatchQuest(type, quest)
//             dispatch(action)
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Challenges)

export default Challenges;