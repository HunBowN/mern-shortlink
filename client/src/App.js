
import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import { useRoutes } from './routes';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';
import 'materialize-css'


function App() {

  

const {token, login, logout, userId, ready} = useAuth()
let payload = null
if(token) {
  payload = JSON.parse(window.atob(token.split('.')[1]))
  // console.log(token, ' наш токен');
  // console.log(payload.exp, ' выводим payload', Date.UTC());
  // token.exp
}


  const currentDate = new Date()
  const isAuthenticated = !!token && payload && ( currentDate < new Date(parseInt(payload.exp+'000')) )
  // console.log(isAuthenticated);
  // console.log(currentDate);
  // if(payload) {  console.log(new Date(parseInt(payload.exp+'000'))); }
  const routes = useRoutes(isAuthenticated) // если я вставляю isAuthenticated то у меня падает приложение

  if (!ready) {
    return <Loader />
  }
    return (
      <AuthContext.Provider value={{
        token, login, logout, userId, isAuthenticated
      }}>
        <Router>
          {isAuthenticated && <Navbar/>}
          <div className="container">
            {routes}
          </div>
        </Router>
      </AuthContext.Provider>
)
}

export default App;







