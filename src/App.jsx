import { useEffect, useState } from 'react'

import { GetRandomMoviesFromNoco } from './functions/nocodbFunctions.js'
import InfiScroll from './pages/InfiScroll.jsx'
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import VideoPlayer from './pages/VideoPlayerX.jsx'
import SearchQuery from './pages/SearchQuery.jsx'
import NavigationBar from './pages/NavigationBar.jsx'
import MoviePage from './pages/MoviePage.jsx'
import Loading from './pages/Loading.jsx'

function App() {

  const [moviesFetched, setMoviesFetched] = useState([])
  const [loadingState, setLoadingState] = useState(true)

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search)
  let videoPlayback = queryParams.get('videoPlayback');
  if (videoPlayback && videoPlayback.length > 1){
    navigate(`/video/${videoPlayback}`)
  }


  useEffect(() => {
    fetchMoviesFromNoCo();
  }, [])

  async function fetchMoviesFromNoCo(){
    let fetchedMoviesFromNoCo = await GetRandomMoviesFromNoco(32);
    // setMoviesFetched(fetchedMoviesFromNoCo);

    // console.log('In App.jsx, moviesFetched : ')
    // console.log(fetchedMoviesFromNoCo)
    try {
      setMoviesFetched(fetchedMoviesFromNoCo.list)
      setLoadingState(false)
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <>
      <Routes>
        <Route element={loadingState ? <Outlet /> : <NavigationBar />}>
          <Route path='/' element= {moviesFetched.length > 0 ? <InfiScroll moviesFetched={moviesFetched}/> : <Loading />} />
          <Route path='/search/:query' element = {<SearchQuery/>} />
          <Route path='/movie/:id' element ={<MoviePage />} />
        </Route>
        <Route path='/video/:id' element = {<VideoPlayer/>} />
        <Route path="*" element={<div>404 : Not Found</div>} />

      </Routes>
    </>
  )
}

export default App
