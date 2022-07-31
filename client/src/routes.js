import React  from 'react'
import {Routes, Route } from 'react-router-dom'


import {LinksPage} from './pages/LinksPage'
import {DetailPage} from './pages/DetailPage'
import {CreatePage} from './pages/CreatePage.js'
import {AuthPage} from './pages/AuthPage.js'


export const useRoutes = (isAuthenticated) => {
    if(isAuthenticated) {
        return (
        <Routes>
          <Route path="/" element={<CreatePage />} />
          <Route path="/links" element={<LinksPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/create" element={<CreatePage />} />
          
        </Routes>
        )
    }


return (
    <Routes>
        <Route path="/" element={<AuthPage />} exact>
          
        </Route>

       
    </Routes>)}




