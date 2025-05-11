import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router';

import { AuthProvider } from './hooks/authContext.tsx';
import { EditorContextProvider } from './hooks/editorContext.tsx';
import { ThemeProvider } from './hooks/themeContext.tsx';

const Authlayout = lazy(() => import("./layouts/Authlayout.tsx"));
const MainLayout = lazy(() => import("./layouts/MainLayout.tsx"));
const EditorLayout = lazy(() => import("./layouts/EditorLayout.tsx"));

const Posts = lazy(() => import("./pages/posts/index.tsx"));
const PostDetail = lazy(() => import("./pages/post-detail/index.tsx"));
const EditPost = lazy(() => import("./pages/post-edit/index.tsx"));
const PostCreate = lazy(() => import("./pages/post-create/index.tsx"));
const Login = lazy(() => import("./pages/log-in/index.tsx"));
const SignUp = lazy(() => import("./pages/sign-up/index.tsx"));

import LayoutLoader from './component/Loader/layout-loader.tsx';
import SingleLoader from './component/Loader/single-loader.tsx';


createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <AuthProvider>
      <EditorContextProvider>
        <ThemeProvider>
        <Routes>
          <Route path='/' element={
            <Suspense fallback={<LayoutLoader/>}>
              <MainLayout/>
            </Suspense>
          }>
            <Route path='/' element={
              <Suspense fallback={<SingleLoader/>}>
                <Posts/>
              </Suspense>
            }/>
            <Route path='/post/:postId' element={
              <Suspense fallback={<SingleLoader/>}>
                <PostDetail/>
              </Suspense>
            }/>
          </Route>
          <Route path='/' element={
            <Suspense  fallback={<LayoutLoader/>}>
             <EditorLayout/>
            </Suspense>
          }>
            <Route path='/editor/new' element={
              <Suspense  fallback={<LayoutLoader/>}>
                <PostCreate/>
              </Suspense>
            }/>
            <Route path='/editor/:postId' element={
              <Suspense  fallback={<LayoutLoader/>}>
                <EditPost/>
              </Suspense>
            }/>
          </Route>
          <Route path='/' element={
            <Suspense fallback={<LayoutLoader/>}>
              <Authlayout/>
            </Suspense>
          }>
            <Route path='/auth/login' element={
              <Suspense  fallback={<SingleLoader/>}>
                <Login/>
              </Suspense>
            }/>
            <Route path='/auth/sign-up' element={
              <Suspense  fallback={<SingleLoader/>}>
                <SignUp/>
              </Suspense>
            }/>
          </Route>
        </Routes>
        </ThemeProvider>
      </EditorContextProvider>
    </AuthProvider>
    </BrowserRouter>
)
