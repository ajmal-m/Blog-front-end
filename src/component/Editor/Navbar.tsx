import { UseEditor } from "../../hooks/editorContext";
import { Component } from "./Preview";

export default function Navbar() {
  const { theme , updateTheme} = UseEditor();
  return (
    <>
        <div className="w-full h-[100px] bg-[#558ef3] dark:bg-[#558ef3] py-[6px] flex items-center justify-end">
          <button className="cursor-pointer bg-[black] rounded text-[white] px-[8px] py-[4px] text-[12px] font-[500]">Post</button>
          <button className="cursor-pointer bg-[black] rounded text-[white] px-[8px] py-[4px] text-[12px] font-[500] m-1">Preview</button>
          <button className="cursor-pointer bg-[black] rounded text-[white] px-[8px] py-[4px] text-[12px] font-[500] m-1" onClick={() => updateTheme(
            theme === "dark" ? "light" : "dark"
          )}>
            {
              theme === 'dark' ? "Dark" : "Light"
            }
          </button>
          <Component/>
        </div>
    </>
  )
}
