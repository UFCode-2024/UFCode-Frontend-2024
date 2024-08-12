import React from 'react'

import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import MainPage from './pages/MainPage'
import World from './features/world'
import CadastroQuestoes from './pages/CadastroQuestoes'
import ProblemsList from "./pages/ProblemsList"
import CodePage from './pages/CodePage'

function routes() { // direciona os botões do menu principal
    return (
        <BrowserRouter>
            <Route path="/" exact component={MainPage} />
            <Route path="/login" component={Login} />
            { localStorage.getItem("name") ? <Route path='/game' component={World} /> : (<Redirect path='/login'/>)}
            <Route path='/game' component={World} />
            <Route path='/register' component={Register} />
            <Route path='/cadquest' component={CadastroQuestoes} />
            <Route path='/listProblems' component={ProblemsList} />
            <Route path='/codePage' component={CodePage} />
        </BrowserRouter>
    )
}

export default routes
