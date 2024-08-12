import Challenges from '../../components/Challenges'
import ChallengeCode from '../../components/ChallengeCode'
import React from 'react';
import './style.css'
import { FaMap } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";


function CodePage(){
    return(
        <div className='code-page'>
            <div className='header'>
                <form action="/">
                    <button>
                        <FaMap />
                    </button>
                </form>
                <div className='curso-modulo'>
                    <span> Curso </span>
                    <IoIosArrowForward />
                    <span> Módulo </span>
                </div>
                <div className='user'>
                    {/* <img src='https://www.feedingmatters.org/wp-content/uploads/2022/12/Generic-profile-pic.png' alt='user-photo'/> */}
                    <span> Usuário </span>
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