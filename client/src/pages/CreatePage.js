import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { UseHttp } from '../hooks/http.hook'

export const CreatePage = () => {
    const history = useNavigate() 
    const auth = useContext(AuthContext)
    const [link, setLink] = useState('')
    const {request}= UseHttp()

    useEffect(() => {
        window.M.updateTextFields()
      }, [])
    const pressHendler = async event => {
        if(event.key==='Enter'){
            try {
                const data = await request('/api/link/generate/', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                    
                })
                
                // console.log(data.link._id)
                // history(`/detail/${data.link._id}`)
                // history(`/detail/`)
                history(`/detail/${data.link._id}`)
                // console.log(data);
                
                
            } catch (e) {
                alert('Выйдете и войдите снова, сеанс истек')
                auth.logout()
                history(`/`)
            }
        }
    }
    return (
    <div className='row'>
    <div className='col s8 offset-s2' style ={{paddingTop: '2rem'}}></div>
    <input 
                placeholder="Вставьте ссылку" 
                id="link" 
                type="text" 
                value={link}
                onChange={ e => setLink( e.target.value ) }
                onKeyDown={pressHendler}
                
                />
                <label htmlFor="link">Введите ссылку</label>
        
    </div> 
    
    )
    
}