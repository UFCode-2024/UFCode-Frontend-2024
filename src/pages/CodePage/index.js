import Challenges from '../../components/Challenges'
import ChallengeCode from '../../components/ChallengeCode'
import React from 'react';
import './style.css'
import { FaMap } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";


function CodePage(){
    const nome = sessionStorage.getItem('userName')
    const foto = sessionStorage.getItem('userPicture')
    return(
        <div className='code-page'>
            <div className='header'>
                <form action="/">
                    <button>
                        <FaMap />
                    </button>
                </form>
                <div className='curso-modulo'>
                </div>
                <div className='user'>
                    <img src={foto} alt='user-photo'/>
                    <span> {nome} </span>
                </div>
            </div>
            <div className='lower-part'>
            <ChallengeCode/>
            <Challenges/>
            </div>
        </div>
    );
}

export default CodePage;