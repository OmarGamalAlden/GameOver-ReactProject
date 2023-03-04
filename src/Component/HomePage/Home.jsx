import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {

  const [allGames, setAllGames] = useState(null);
  
  async function getGames() {

  let {data} = await axios.get("https://free-to-play-games-database.p.rapidapi.com/api/games",{
  headers: {
    'X-RapidAPI-Key': '3c98e263f8mshba01b8fa7a2d1ccp135853jsn71048efd7302',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }})

  setAllGames( data );
};


  useEffect(() => {
    getGames();
  }, [])
  
  return <>

  { allGames!=null? <div className="container pt-5 mt-5">
    <div className="row">
      {allGames.slice(0,32).map( (game , idx)=> <div key={idx} className="col-md-3 text-center gameDiv">
        <Link to={`/gamedeatils/${game.id}`}>
        <div className="game">
          <img src={game.thumbnail} className='w-100'  alt="game photo" />
          <h5> {game.title} </h5>
          <p>publisher : {game.publisher} </p>
          <p> {game.short_description} </p>
          <button><a href={game.game_url} target="_blanck">GotoGame</a></button>
        </div>
        </Link>
      </div> )}
    </div>
  </div> : <div className="vh-100 bg-secondary d-flex align-items-center justify-content-center">
    <i className='fa-solid fa-spinner fa-spin fa-7x text-white'></i>
  </div> }

  
  </>
}
