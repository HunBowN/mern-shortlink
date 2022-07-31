import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { UseHttp } from '../hooks/http.hook'
import { useMassage } from '../hooks/message.hook'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  
  const message = useMassage()
  const {loading, request, error, clearError} = UseHttp()
  const [form, setForm] = useState({

    email: '', password: ''
  })

  useEffect(() => {
    // console.log('Errorrr', error);
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])
  
  const changeHandler =  event => {
    setForm({...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
        const data = await request('/api/auth/register', 'POST', {...form})
        message(data.message)
        
    } catch (e) {} 
  }

  const loginHandler = async () => {
    try {
        const data = await request('/api/auth/login', 'POST', {...form}) //
        auth.login(data.token, data.userId)
        
    } catch (e) {} 
  }

    return (
    <div className='row'>
        <div className='col s6 offset-s3'>
            <h1>Сократи ссылку</h1>
            <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">Авторизация</span>
          <div>

            <div className="input-field ">
                <input 
                placeholder="Введите email" 
                id="email" 
                type="text" 
                name="email"
                value={form.email}
                onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
            </div>

            <div className="input-field ">
                <input 
                placeholder="Введите пароль" 
                id="password" 
                type="password" 
                name="password"
                value={form.password}
                onChange={changeHandler}
                />
                <label htmlFor="email">password</label>
            </div>
          </div>
        </div>
        <div className="card-action">
          <button 
          className='btn blue darken-4' 
          style={{marginRight: 10}}
          onClick={loginHandler}
          disabled={loading}
          >
            Войти
            </button>
          <button className='btn grey darken-1'
          onClick={registerHandler}
          disabled={loading}
          >
            Регистрации
            </button>
        </div>      
      </div>
        </div>
  
    </div>)
}