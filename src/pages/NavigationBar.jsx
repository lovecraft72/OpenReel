import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { ReactComponent as HomeIcon } from '../assets/home.svg';

function NavigationBar() {
    
    function searchQuery(query){
        if (query.trim().length == ''){
            navigate(`/`)
        }
        else {
            navigate(`/search/${encodeURI(query.trim())}`)
            // navigate(`/video/109632`)
        }
    }

    let timeout;
    function scheduleSearch(query){
        if (timeout && clearTimeout(timeout)) {}
        timeout = setTimeout(() => {searchQuery(query)}, 700)
    }

    function jumpToHome(){
        navigate(`/`)
    }

    const navigate = useNavigate();
  return (
    <>
        {/* <HomeIcon className='bg-amber-300 h-[4em] w-[4em] w-6 h-6 text-blue-500' /> */}
        <div class='absolute top-0 left-0 w-full h-[6em] z-2 bg-gradient-to-b from-black to-black/0 flex items-center justify-center'>
            <HomeIcon className='h-[3em] w-[2.8em] fill-amber-100 transition-all duration-150 mx-4 hover:scale-110 hover:brightness-150 justify-self-start cursor-pointer' onClick={()=> {jumpToHome()}}/>
            <input type='text' style={{userSelect: 'none'}} onChange={(e) => {scheduleSearch(e.target.value)}} className=' w-[70%] h-[3em] p-4 z-30 bg-black-950/50 rounded-3xl text-slate-300 ring-2 shadow-2xl shadow-amber-50 md:w-[60%]' placeholder='Search'></input>
        </div>      
        <Outlet />
    </>
    
  )
}

export default NavigationBar