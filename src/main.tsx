import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router';
import Authlayout from './layouts/Authlayout.tsx';
import MainLayout from './layouts/MainLayout.tsx';
import { AuthProvider } from './hooks/authContext.tsx';
import SigIn from './pages/sign-in/index.tsx';
import Posts from './pages/posts/index.tsx';
import PostDetail from './pages/post-detail/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
        <Routes>
          <Route path='/' element={<MainLayout/>}>
            <Route path='/' element={<Posts/>}/>
            <Route path='/post/:postId' element={<PostDetail/>}/>
          </Route>
          <Route path='/' element={<Authlayout/>}>
            <Route path='/login' element={<SigIn/>}/>
            <Route path='/signin' element={<SigIn/>}/>
          </Route>
        </Routes>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
