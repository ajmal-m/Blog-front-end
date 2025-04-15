import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import {BrowserRouter, Route, Routes} from 'react-router';
import Authlayout from './layouts/Authlayout.tsx';
import MainLayout from './layouts/MainLayout.tsx';
import { AuthProvider } from './hooks/authContext.tsx';
import SigIn from './pages/sign-in/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
        <Routes>
          <Route path='/' element={<Authlayout/>}>
            <Route path='/login' element={<App/>}/>
            <Route path='/signin' element={<SigIn/>}/>
          </Route>
          <Route path='/' element={<MainLayout/>}>
            <Route path='/posts' element={<App/>}/>
            <Route path='/signin' element={<SigIn/>}/>
          </Route>
        </Routes>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
