import { useState, useCallback } from 'react'

export const UseHttp = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const request = useCallback( async (url, method = 'GET', body = null, headers = {}) => {

        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
            }

            headers['Content-Type'] = 'application/json'

           const response = await fetch (url, {method, body, headers})

           console.log(response, 'response');
           
           const data = await response.json();

           if(!response.ok) {
               throw new Error(data.massage || 'Что-то пошло не так ')
           }
           setLoading(false)

           return data
            
        } catch (e) {
            setLoading(false)
            setError(e.massage)
            throw e
        }

    }, [])

    const clearError = useCallback (()=>setError(null), []) 

    return { loading, request, error, clearError}
}