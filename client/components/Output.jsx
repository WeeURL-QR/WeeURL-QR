import React from 'react';

export default function Output(newUrl){

 
    return(
        <div className='outputUrl'>
            <label> Shortened URL </label>
            <input type="text" id="inputText" value={newUrl}></input>
            <button onClick={() => navigator.clipboard.writeText(newUrl)}> Copy </button>
            <img></img>
        </div> 

    )
}