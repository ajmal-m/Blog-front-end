import { memo } from "react";

const TextInput = memo(( { value, setValue} : { value: string; setValue: (s: string) => void} ) => {
    return(
        <>
            <input 
                type="text" 
                name="fullName"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-gray-50 rounded text-black p-3  outline-none mt-1 text-[14px] font-[500]"
            />
        </>
    )
});

export default TextInput;