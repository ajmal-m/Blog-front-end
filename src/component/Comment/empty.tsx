import { memo } from "react";

const Empty = memo(({text} : { text : string}) => {
    return(
        <>
            <div className="h-full w-full flex items-center justify-center">
                <div >
                    <h1 className="text-[22px] text-white font-[500]">{text}</h1>
                </div>
            </div>
        </>
    )
});

export default Empty;