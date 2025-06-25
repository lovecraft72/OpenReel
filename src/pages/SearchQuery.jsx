import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SearchForMoviesOnNoCo } from '../functions/nocodbFunctions';
import TiltedCard from '../assets/reactbits/TiltedCard';
import Loading from './Loading';

function SearchQuery() {

    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const {query} = useParams();
    let defaultPoster = 'https://images.pexels.com/photos/114820/pexels-photo-114820.jpeg'
    const navigate = useNavigate()

    useEffect(() => {
        getMoviesFromDB();
    }, [query])

    async function getMoviesFromDB(){
        setIsLoading(true)
        let data = await SearchForMoviesOnNoCo(query);
        if (data != false){
            try {
                setSearchResults(data.list);
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        setIsLoading(false)
    }

    return (

        (isLoading ? <Loading/> : 
            <div className='w-screen min-h-screen bg-slate-900 text-slate-200 flex justify-center overflow-x-hidden pt-[7em] md:pt-[0em] overflow-scroll'>
                <div title='cards-container' className='h-[80%] max-w-[80%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-10 gap-y-5 md:mt-35'>
                    {
                        (searchResults && searchResults.length > 0 ) ? searchResults.map((e) => {
                            return (<TiltedCard
                                class='cursor-pointer'
                                className=' '
                                key={e.TMDb_ID}
                                TMDb_ID={e.TMDb_ID}
                                imageSrc={e.Poster_Path || defaultPoster}
                                altText={e.Title}
                                captionText={e.Title}
                                // containerHeight="300px"
                                // containerWidth="200px"
                                containerHeight="200px"
                                containerWidth="140px"
                                imageHeight="200px"
                                imageWidth="140px"
                                rotateAmplitude={12}
                                scaleOnHover={1.2}
                                showMobileWarning={false}
                                showTooltip={true}
                                displayOverlayContent={true}
                                overlayContent={
                                    <p className="tilted-card-demo-text bg-slate-950/80 p-2 m-2 rounded-2xl">
                                    {e.Title}
                                    </p>
                                    }
                                // onClick={(ev) => {navigate(`/video/${ev.currentTarget.dataset.key}`)} }
                            />)
                        }) : <div>Could Not Find Any Results</div>
                    }
                </div>

            </div>)
    )
}

export default SearchQuery