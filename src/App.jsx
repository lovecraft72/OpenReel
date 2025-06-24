import { useEffect, useState } from 'react'

import { GetRandomMoviesFromNoco } from './functions/nocodbFunctions.js'
import InfiScroll from './pages/InfiScroll.jsx'
import { Route, Routes } from 'react-router-dom'
import VideoPlayer from './pages/VideoPlayerX.jsx'
import SearchQuery from './pages/SearchQuery.jsx'
import NavigationBar from './pages/NavigationBar.jsx'
import MoviePage from './pages/MoviePage.jsx'

function App() {

  const [moviesFetched, setMoviesFetched] = useState([])
  
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
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <>
      <Routes>
        <Route element={<NavigationBar />}>
          <Route path='/' element= {<InfiScroll moviesFetched={moviesFetched}/>} />
          <Route path='/search/:query' element = {<SearchQuery/>} />
          <Route path='/movie/:id' element ={<MoviePage />} />
        </Route>
        <Route path='/video/:id' element = {<VideoPlayer/>} />

      </Routes>
    </>
  )
}

export default App
