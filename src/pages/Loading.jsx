import React from 'react'
import LoadingAnimation from "../assets/LoadingAnim.json"
import Lottie from 'lottie-react'

function Loading() {
  return (
    <div className='bg-slate-900 w-screen h-screen overflow-hidden flex justify-center items-center'>

        <Lottie className='scale-65' animationData={LoadingAnimation} loop={true} />
    </div>
  )
}

export default Loading