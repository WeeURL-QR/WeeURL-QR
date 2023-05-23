import React, {useState} from 'react';

export default function Input({oldUrl, generate, setOldUrl}){




    function inputText(e){
        setOldUrl(e.target.value)
    }

    return(
        <div className='inputUrl'>
            <label> URL </label>
            <input type="text" id="inputText" placeholder="Input New Source Url" onChange={(e)=> inputText(e)}></input>
            <button onClick={() => generate()}> Generate </button>
        </div> 

    )

}

