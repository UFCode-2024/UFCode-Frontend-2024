import React from 'react'
import './style.css'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { dispatchQuest } from './dispatchQuest'
import { listProblems } from '../../api'
import { QUEST } from '../../config/constants'
import { useHistory } from 'react-router-dom'

function GameChallenge(props) {
    const history = useHistory();

    const initialState = {
        id: null,
        name: null,
        description: null,
        input: null,
        expectedOutput: null,
        houseId: null,
        positionX: null,
        positionY: null,
        difficultyId: null,
        courses: null,
        modules: null
    }

    const constructionState = {
        id: null,
        name: "Questão em Construção",
        description: "Olá, ficamos felizes que tenha chegado até aqui, no momento nossa casa ainda está em construção, em breve traremos novos desafios para você :)",
        input: null,
        expectedOutput: null,
        houseId: null,
        positionX: null,
        positionY: null,
        difficultyId: null,
        courses: null,
        modules: null

    }

    const [currentQuest, setCurrentQuest] = useState(initialState)
    const [questList, setQuestList] = useState([])
    const login = localStorage.getItem("name")
    const _course = localStorage.getItem("course")
    const _module = localStorage.getItem("module")
    const [positionQuest, setPositionQuest] = useState(0)
    const [profileImg, setprofileImg] = useState('./mainCharacters/protagonist.png')

    useEffect(() => {
        listProblems(_course, _module).then(res => {
            setQuestList(res.data)
            if (res.data.length === 0)
                history.push('/')
            console.log(res.data)
        }).catch(error => {
            console.log(error)
        })
    }, [login])


    const changeProblem = (_currentQuest, total) => {
        if (positionQuest == total) {
            setPositionQuest(0)
        } else {
            setPositionQuest(positionQuest + 1)

            console.log(_currentQuest)
        }
        return _currentQuest = questList[positionQuest]
        console.log(positionQuest)
    }

    const haveQuestion = () => {
        if (props.position[0] === 512 && props.position[1] === 160)
            return true
        if (props.position[0] === 160 && props.position[1] === 352)
            return true
        if (props.position[0] === 576 && props.position[1] === 416)
            return true
        if (props.position[0] === 192 && props.position[1] === 608)
            return true
        if (props.position[0] === 608 && props.position[1] === 608)
            return true
        else
            return false
    }

    useEffect(() => {

        let _currentQuest = null
        const total = questList.length

        if (props.position[0] === 512 && props.position[1] === 160) {
            if (questList[0] != null) {
                _currentQuest = questList[0]
            } else {
                _currentQuest = constructionState
            }
            console.log(_currentQuest)
        }
        if (props.position[0] === 160 && props.position[1] === 352) {
            if (questList[1] != null) {
                _currentQuest = questList[1]
            } else {
                _currentQuest = constructionState
            }
            console.log(_currentQuest)
        }
        if (props.position[0] === 576 && props.position[1] === 416) {
            if (questList[2] != null) {
                _currentQuest = questList[2]
            } else {
                _currentQuest = constructionState
            }
            console.log(_currentQuest)

        }
        if (props.position[0] === 192 && props.position[1] === 608) {
            if (questList[3] != null) {
                _currentQuest = questList[3]
            } else {
                _currentQuest = constructionState
            }
            console.log(_currentQuest)

        }
        if (props.position[0] === 608 && props.position[1] === 608) {
            if (questList[4] != null) {
                _currentQuest = questList[4]
            } else {
                _currentQuest = constructionState
            }
            console.log(_currentQuest)

        }
        // existe alguma quest na posicao atual?
        // se sim, seta a quest.
        if (_currentQuest != null) {
            console.log("Current quest??")
            setCurrentQuest(_currentQuest)
            props.dispatchQuest(QUEST, _currentQuest)
        } else {
            setCurrentQuest(initialState)
            props.dispatchQuest(QUEST, initialState)
        }
    }, [props.position[0], props.position[1]])

    return (
        <div className='game-challenge'>
            <div className='char-img'>
                <img src={require('./mainCharacters/protagonist.png')} height='100%' width='100%' />
            </div>
            <div className='challenge'>
                <div className='descricao'>
                    <span>{currentQuest.description}</span>
                </div>
                
                <button>Aceitar Missão</button>
            </div>


        </div>
    )

}

function mapStateToProps(state) {
    return {
        tiles: state.map.tiles,
        position: state.player.position,
        id: state.player.id,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchQuest(type, quest) {
            const action = dispatchQuest(type, quest)
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameChallenge)