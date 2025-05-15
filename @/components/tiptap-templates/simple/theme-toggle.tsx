"use client"

import * as React from "react"

// --- UI Primitives ---
import { Button } from "../../tiptap-ui-primitive/button"

// --- Icons ---
import { MoonStarIcon } from "../../tiptap-icons/moon-star-icon"
import { SunIcon } from "../../tiptap-icons/sun-icon"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootStore } from "../../../../src/store"
import { toggleTheme } from "../../../../src/store/themeSlice"

export function ThemeToggle() {

  const theme = useSelector((state: RootStore) => state.theme.theme);
  const dispatch = useDispatch<AppDispatch>();



  document.documentElement.classList.toggle("dark", theme === 'dark' )


  const toggleDarkMode = () => {
    dispatch(toggleTheme());
    document.documentElement.classList.toggle("dark", theme === 'dark')
  }

  return (
    <Button
      onClick={toggleDarkMode}
      aria-label={`Switch to ${theme ==='dark' ? "light" : "dark"} mode`}
      data-style="ghost"
    >
      {theme ==='dark' ? (
        <MoonStarIcon className="tiptap-button-icon" />
      ) : (
        <SunIcon className="tiptap-button-icon" />
      )}
    </Button>
  )
}
