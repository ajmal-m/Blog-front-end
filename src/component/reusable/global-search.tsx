import { FormEvent, memo, useCallback, useState } from "react"
import { useNavigate } from "react-router";


export const GlobalSearch = memo(() => {
    const [search, setSearch] = useState<string>("");
    const navigate = useNavigate();
    const updateSearch = useCallback((e : FormEvent) => {
        e.preventDefault();
        navigate(`/?search=${search}`)
    }, [search]);
    return(
        <>
            <form onSubmit={updateSearch}>
            <input 
              type="search" name="search" id="search"  
              placeholder="Search...."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
              w-[300px] h-[35px] bg-[#e1e1e1] p-[6px] 
              rounded-[4px] text-black font-[500] text-[14px] outline-none
              placeholder-black
              "
            />
          </form>
        </>
    )
});