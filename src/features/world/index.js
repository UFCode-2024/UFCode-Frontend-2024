import React from 'react'
import { connect } from 'react-redux'

import Player from '../player'
import Map from '../map'

import { WEST, EAST, NORTH, SOUTH, MAP_HEIGHT, MAP_WIDTH } from '../../config/constants'
import { moveToPosition } from './events'
import { setTiles } from '../map/environment'
import { tiles } from '../../data/maps/1'

import GameChallenge from '../../components/GameChallenge'
import { TiHome } from "react-icons/ti";
import { IoIosArrowForward } from "react-icons/io";
import './style.css'




function World(props) {
    const nome = sessionStorage.getItem('userName')
    const foto = sessionStorage.getItem('userPicture')
    

    function handleKeyDown(e) {
        switch (e.keyCode) {
            case 37:
                return props.moveToPosition(WEST)
            case 38:
                return props.moveToPosition(NORTH)
            case 39:
                return props.moveToPosition(EAST)
            case 40:
                return props.moveToPosition(SOUTH)
            default: return
        }
    }

    //previne carregar o mapa toda vez que World é renderizado
    if (props.tiles && props.tiles.length === 0) {
        props.setTiles(tiles)
    }


    //console.log('render world')
    return (
        <div className='world'>
            <div className='header'>
                <form action="/">
                    <button
                        style={{
                            background: "red",
                            color: "black"
                        }}
                    >
                        <TiHome /></button>
                </form>
                <div className='curso-modulo'>
                </div>
                <div className='user'>
                    <img src={foto} alt='user-photo'/>
                    <span> {nome} </span>
                </div>
            </div>
            <div className='web-container'>

                <div
                    style={{
                        gridArea: 'game',
                        position: 'relative',
                        width: `${MAP_WIDTH}px`,
                        height: `${MAP_HEIGHT}px`,
                        outline: '0px',
                        borderStyle: 'solid',
                        borderColor: 'white'
                    }}
                    tabIndex='-1'
                    onKeyDown={
                        (e) => {
                            e.preventDefault()
                            handleKeyDown(e)
                        }
                    }
                >


                    <Map />
                    <Player />

                </div>

                <GameChallenge />
            </div>
            </div>
    )
}

function mapStateToProps(state) {
    return {
        position: state.player.position,
        tiles: state.map.tiles
    }
}

function mapDispatchToProps(dispatch) {
    return {
        moveToPosition(direction) {
            const action = moveToPosition(direction)
            dispatch(action)
        },
        setTiles(tiles) {
            const action = setTiles(tiles)
            dispatch(action)
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(World)