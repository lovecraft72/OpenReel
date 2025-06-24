import React, { useEffect, useState } from 'react'

import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { GiveLinkForThisTMBDId } from '../functions/nocodbFunctions';



export default function VideoPlayer() {

    const {id} = useParams()
    const [dataReceived, setDataReceived] = useState(null);
    const [videoLink, setVideoLink] = useState(null)

    async function getDataFromNoCoDB(tmbdId){
        let data = await GiveLinkForThisTMBDId(tmbdId)
        if (data != false) {
            try {
                setDataReceived(data)
                let vidLink = `https://archive.org/serve/${encodeURI(data.list[0].IA_Identifier)}/${encodeURI(data.list[0].IA_FileName)}`
                setVideoLink(vidLink);
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        else {
            alert('Sorry, couldnt find the movie with the id : ' + tmbdId)
        }
    }

    useEffect(() => {
        getDataFromNoCoDB(id)
    }, [id])

    return (
        <div className='h-screen w-screen m-0 p-0 overflow-hidden bg-black'>
            <ReactPlayer
                // className='m-8 p-0 h-[20%]'
                url={videoLink}
                playing={true}
                controls={true}
                width='100%'
                height='100%'
                // muted={true}  
                onReady={() => console.log('Player is ready')}
                onPlay={() => console.log('Playing')}
                onPause={() => console.log('Paused')}
                onEnded={() => console.log('Video ended')}
                volume={0.8}
            />
        </div>
    )
}

