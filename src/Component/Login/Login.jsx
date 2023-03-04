import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();

  const [apiMessage, setApiMessage] = useState("");

  const [joiErrors, setjJoiErrors] = useState(null);

  const [user, setUser] = useState( {
    email:"",
    password:"",
  } );

  function getUser( e ){
    let propertyName = e.target.id;
    let userValue = e.target.value;
    let newUser ={...user};
    newUser[propertyName] = userValue;
    setUser(newUser);
  }

  function submitUser( e ){
    e.preventDefault();

    const schema = Joi.object(
      {
        email: Joi.string().email({ minDomainSegments: 2,maxDomainSegments:7, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().pattern( /^[a-z]{6,10}$/i ).required(),
      }
    )

    let validateTest = schema.validate( user, { abortEarly: false } );
    
    if (validateTest.error == undefined) {
      // kda el data valid
      // call b2a el API
      callAPI();
    }else{
      setjJoiErrors( validateTest.error.details );
    }

  }

  async function callAPI (){
    let {data} = await axios.post("https://route-egypt-api.herokuapp.com/signin" , user);

    if (data.message == "success") {
      navigate("/home");
    }else{
    setApiMessage( data.message );
    }
  }


  return <>
  <section className='mt-5 mb-3 py-5'>
  <div className="container">
    <div className="row">

    { joiErrors==null ? "" : joiErrors.map((error)=> <h5 className="alert text-center alert-danger"> {error.message} </h5> ) }

    { apiMessage.length==0 ? "" :  <h5 className="alert text-center alert-danger"> {apiMessage} </h5> }

      <div className="col-md-6">
        <div className="registerImg">
          <img src="gaming.ebaf2ffc84f4451d.jpg" className='w-100' alt="" />
        </div>
      </div>
      <div className="col-md-6 half py-4">
        
        <div className="forminputs">
          <form className='w-100' onSubmit={ submitUser }>
          <h4 className='my-4 mt-5 text-center'>Log in to GameOver</h4>

          <div className="registerForm">

          <input onChange={getUser} type="email" id='email' className='w-100 form-control mb-3' placeholder='Email Address' />

          <input onChange={getUser} type="Password" id='password' className='w-100 form-control mb-3' placeholder='Password' />

          <button className='form-control py-2'>Create Account</button>

          </div>
          </form>
          <div className="areUin">
            <p><a href="">Forgot Password</a></p>
            <p>Not a member yet? <a href="register">Create Account</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </section>
  </>
}

