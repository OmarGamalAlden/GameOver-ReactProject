import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function GameDeatil() {

    const [gameDeatil, setGameDeatil] = useState(null);

    const Slideshow = ({ imgs }) => {
        const [index, setIndex] = useState(0)
      
        useEffect(() => {
            setIndex(0);
        }, [])
      
        let next = () => {
          if (index == imgs.length - 1) {
            setIndex(0)
          } else {
            setIndex(index + 1)
          }
        };

        let prev = () => {
          if (index == 0) {
            setIndex(imgs.length - 1)
          } else {
            setIndex(index - 1)
          }
        }
      
      
        return (
          <div className="slideshow">
            <img className="mainImg" src={imgs[index]} />
            <div className="actions text-center">
              <button onClick={prev}>👈</button>
              <button onClick={next}>👉</button>
            </div>
          </div>
        )
    }

    let { id } = useParams();    

    async function getGameDeatil(){
        let {data} = await axios.get("https://free-to-play-games-database.p.rapidapi.com/api/game",{
        params: {id: `${id}`},
        headers: {
          'X-RapidAPI-Key': '3c98e263f8mshba01b8fa7a2d1ccp135853jsn71048efd7302',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }})
      
        setGameDeatil( data );

    };


    useEffect(()=> {
    getGameDeatil();
    },[]);

    // {
    //     $(document).ready(function() {
    //         $(".skitter-large").skitter();
    //     });
    // }

  return <>
  {gameDeatil?<div className="container">
    <div className="row pt-5 mt-5">
        <div className="col-md-3">
            <div className="poster">
                <img src={gameDeatil.thumbnail} className='w-100' alt="" />
            </div>
        </div>
        <div className="col-md-9">
            <div className="gameDeatils">
                <h4> {gameDeatil.title} </h4>
                <p> {gameDeatil.description} </p>
                <span className='bg-ingo p-1'>type : <span> {gameDeatil.genre} </span></span>
                <h6> devolped by : {gameDeatil.developer} </h6>
                { gameDeatil.minimum_system_requirements == undefined? "" : <p>the Requiremants :
                    <ul>
                        <li> {gameDeatil.minimum_system_requirements.graphics} </li>
                        <li> {gameDeatil.minimum_system_requirements.memory} </li>
                        <li> {gameDeatil.minimum_system_requirements.processor} </li>
                    </ul> 
                </p> }
            </div>

            <div className="sliderr">
                <h1 className='text-center'>SlideShow</h1>
                <Slideshow
                    imgs={gameDeatil.screenshots.map( (img)=>  img.image )}
                />
            </div>

        </div>
    </div>
  </div> : <div className="vh-100 bg-secondary d-flex align-items-center justify-content-center">
    <i className='fa-solid fa-spinner fa-spin fa-7x text-white'></i>
  </div>}
  
  
  </>
}
