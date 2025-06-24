
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './MoviePage.css';
import { GiveLinkForThisTMBDId } from '../functions/nocodbFunctions';

function MoviePage() {

    const[movieTitle, setMovieTitle] = useState('');
    const[movieDescription, setMovieDescription] = useState('');
    const { id } = useParams()
    let urlOfVideoFile = `${window.location.protocol}//${window.location.host}${import.meta.env.BASE_URL}/video/${id}`

    useEffect(() => {
        getMovieData();
    }, [id])

    async function getMovieData(){
        let data = await GiveLinkForThisTMBDId(id)
        if (data != false){
            setMovieTitle(data.list[0].Title);
            setMovieDescription(data.list[0].Overview)
        }
    }

  return (
    <div class='bg-slate-900 w-screen h-screen overflow-x-hidden pt-[12em] flex justify-start items-center flex-col'>
        <iframe src={urlOfVideoFile} class='w-[90%] h-[60%] rounded-4xl md:w-[60%]'></iframe>
        <h1 className='title text-center'  >{movieTitle}</h1>
        <div className='px-3 pt-3 md:px-30'>
            <div className='description text-center' >{movieDescription}</div>
        </div>
    </div>
  )
}

export default MoviePage