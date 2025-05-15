import {createSlice} from '@reduxjs/toolkit';

const getCurrentTheme = () => {
    const theme = localStorage.getItem("theme") || "dark";
    return theme;
};

type ThemeType = {
    theme: string;
}


const initialState : ThemeType = {
    theme: getCurrentTheme()
}


const themeSlice = createSlice({
    name:"Theme",
    initialState,
    reducers:{
        toggleTheme:(state) => {
            state.theme = state.theme === 'dark' ? 'light':'dark';
            localStorage.setItem("theme", state.theme);
        }
    }
});


export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;