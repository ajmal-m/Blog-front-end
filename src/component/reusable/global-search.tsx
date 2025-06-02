import React, { FormEvent, memo, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { clearPosts, fetchPosts } from "../../store/postSlice";
import { AppDispatch, RootStore } from "../../store";


export const GlobalSearch = memo(() => {

    const {limit} = useSelector((state : RootStore) => state.post)
    const [search, setSearch] = useState<string>("");
    const [params] = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();


    const updateSearch = useCallback((e : FormEvent) => {
        e.preventDefault();
        navigate(`/?search=${search}`)
    }, [search]);

    const handleChange = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        if(value){
            setSearch(value);
        }else{
            setSearch(value);
            navigate('/?search=');
            dispatch(clearPosts());
            dispatch(fetchPosts({limit : limit, page : 1, q :value || ""}))
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