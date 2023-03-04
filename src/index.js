import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css"
import '@fortawesome/fontawesome-free/css/all.min.css'
import "skitter-slider/dist/skitter.css"
import './index.css';
import "skitter-slider/dist/jquery.skitter.min.js"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import App from './App';
import reportWebVitals from './reportWebVitals';
import {  createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './Component/HomePage/Home';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import Notfound from './Component/NotFound/Notfound';
import GameDeatil from './Component/GameDeatil/GameDeatil';
const router = createHashRouter([
  { path:"" , element:<App/> , children:[
    { path: "", element:<Login /> },
    { path: "home", element:<Home /> },
    { path: "login", element:<Login /> },
    { path: "gamedeatils", element:<GameDeatil />, children:[
      { path:":id"}
    ] },
    { path: "register", element:<Register /> },
    { path: "*", element:<Notfound /> },
  ] }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={ router }/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
