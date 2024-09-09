import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './config/store'
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </Provider>,
  document.getElementById('root')
);