import { createRoot } from 'react-dom/client';
import {BrowserRouter} from 'react-router';
import { EditorContextProvider } from './hooks/editorContext.tsx';

import {Provider} from 'react-redux';
import {store} from '../src/store/index.ts'
import App from './App.tsx';


createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <Provider store={store}>
        <EditorContextProvider>
            <App/>
        </EditorContextProvider>
    </Provider>
    </BrowserRouter>
)
