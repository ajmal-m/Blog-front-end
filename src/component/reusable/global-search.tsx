import React, { FormEvent, memo, useCallback, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router";


export const GlobalSearch = memo(() => {
    const [search, setSearch] = useState<string>("");
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const updateSearch = useCallback((e : FormEvent) => {
        e.preventDefault();
        navigate(`/?search=${search}`)
    }, [search]);

    const handleChange = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if(value){
            setSearch(value);
        }else{
            setSearch(value);
            navigate('/?search=')
        }

    }, [search])

    useEffect(() => {
        if(params.get("search")){
            setSearch(params.get("search") || "")
        }
    },[])
    return(
        <>
            <form onSubmit={updateSearch}>
            <input 
              type="search" name="search" id="search"  
              placeholder="Search...."
              value={search}
              onChange={handleChange}
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