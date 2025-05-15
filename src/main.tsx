import { createRoot } from 'react-dom/client';
import {BrowserRouter} from 'react-router';

import { AuthProvider } from './hooks/authContext.tsx';
import { EditorContextProvider } from './hooks/editorContext.tsx';
import { ThemeProvider } from './hooks/themeContext.tsx';

import {Provider} from 'react-redux';
import {store} from '../src/store/index.ts'
import App from './App.tsx';


createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <Provider store={store}>
       <AuthProvider>
        <EditorContextProvider>
          <ThemeProvider>
            <App/>
          </ThemeProvider>
        </EditorContextProvider>
      </AuthProvider>
    </Provider>
    </BrowserRouter>
)
