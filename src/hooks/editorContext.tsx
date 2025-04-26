import { createContext, useContext, useState } from "react";


type EditorContextType = {
    theme: string;
    content: string;
    updateTheme: (theme: string) => void;
    updateContent: (content: string) => void;
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const UseEditor = () => {
    const context = useContext(EditorContext);
    if(!context){
        throw Error("Undefined context")
    }
    return context;
}



export const EditorContextProvider = ({ children} : { children : any}) => {
    const [theme, setTheme] = useState("dark");
    const [content, setContent] = useState(`<h1 dir="auto" style="text-align: center">Rich Text Editor</h1><p dir="auto">A modern WYSIWYG rich text editor based on <a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://github.com/scrumpy/tiptap">tiptap</a> and <a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://ui.shadcn.com/">shadcn ui</a> for Reactjs</p><p dir="auto"></p><p dir="auto" style="text-align: center"></p><p dir="auto"><div style="text-align: center;" class="image"><img height="auto" style="" src="https://picsum.photos/1920/1080.webp?t=1" flipx="false" flipy="false" width="500" align="center" inline="false"></div></p><p dir="auto"></p><div data-type="horizontalRule"><hr></div><h2 dir="auto">Demo</h2><p dir="auto">👉<a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://reactjs-tiptap-editor.vercel.app/">Demo</a></p><h2 dir="auto">Features</h2><ul><li><p dir="auto">Use <a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://ui.shadcn.com/">shadcn ui</a> components</p></li><li><p dir="auto">Markdown support</p></li><li><p dir="auto">TypeScript support</p></li><li><p dir="auto">I18n support (vi, en, zh, pt)</p></li><li><p dir="auto">React support</p></li><li><p dir="auto">Slash Commands</p></li><li><p dir="auto">Multi Column</p></li><li><p dir="auto">TailwindCss</p></li><li><p dir="auto">Support emoji</p></li><li><p dir="auto">Support iframe</p></li><li><p dir="auto">Support mermaid</p></li></ul><h2 dir="auto">Installation</h2><pre code="pnpm install reactjs-tiptap-editor" language="bash" linenumbers="true" wordwrap="false" tabsize="2" shouldfocus="false"><code>pnpm install reactjs-tiptap-editor</code></pre><p dir="auto"></p>`)
    
    const updateTheme = (theme: string) => {
        setTheme(theme);
    };


    const updateContent = (content: string) => {
        setContent(content);
    }
    return <EditorContext.Provider value={{
        theme,
        content,
        updateContent,
        updateTheme
    }}>
        {children}
    </EditorContext.Provider>
}