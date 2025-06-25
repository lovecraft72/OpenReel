import { useEffect, useState } from 'react';
import InfiniteMenu from '../assets/reactbits/InfiniteMenu/InfiniteMenu.jsx'
import { GetRandomMoviesFromNoco } from '../functions/nocodbFunctions.js';

export default function InfiScroll({moviesFetched}){
    
    const [items, setItems] = useState([])

    useEffect(() => {
        let temp_items = [];

        // console.log('Movies Obtained : ')
        // console.log(moviesFetched)

        try {
            moviesFetched.forEach(element => {
                // console.log(element.Poster_Path)

                let img = 'https://images.pexels.com/photos/6128182/pexels-photo-6128182.jpeg'
                try {
                    if (element.Poster_Path != null){
                        img = element.Poster_Path;
                        // img = 'https://api.allorigins.win/get?' + element.Poster_Path;
                        // img.replace('ws500', 'w300')
                    }
                } catch {
                    {}
                }
                let movObj = {
                    bg: element.Backdrop_Path,
                    image: img,
                    link: element.TMDb_ID,
                    title: `${element.Title} (${Math.round(element.Year)})`,
                    description: `${element.Overview.length > 205 ? element.Overview.substring(0,205) + '...' : element.Overview}`
                }
                temp_items = [...temp_items, movObj]
            })
            setItems(temp_items)
        } catch (error) {
            console.log(error)
        }
        
    }, [moviesFetched])

    // let fetchedMovies = fetchPublicDomainMovies();


    // const items = [
    //     {
    //         image: 'https://picsum.photos/300/300?grayscale',
    //         link: 'https://google.com/',
    //         title: 'Item 1',
    //         description: 'This is pretty cool, right?'
    //     },
    // ];
    
    return (
        <>
        <div className='m-0 p-0 h-screen absolute overflow-hidden text-stone-200'>

        {/* <div style={{ margin: '0px', padding:'0px' , height: '100%', position: 'absolute', overflow:'hidden', color:'white'}}> */}
        <InfiniteMenu items={items}/>
        {/* </div> */}
        </div>
        </>
    )
}


