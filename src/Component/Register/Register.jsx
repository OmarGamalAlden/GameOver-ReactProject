import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const navigate = useNavigate();

  const [apiMessage, setApiMessage] = useState("");

  const [joiErrors, setjJoiErrors] = useState(null);

  const [user, setUser] = useState( {
    first_name:"",
    last_name:"",
    email:"",
    password:"",
    age:0
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
        first_name: Joi.string().alphanum().min(3).max(12).required(),
        last_name: Joi.string().alphanum().min(3).max(12).required(),
        email: Joi.string().email({ minDomainSegments: 2,maxDomainSegments:7, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().required(),
        age:Joi.number().min(18).max(80).required()
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
    let {data} = await axios.post("https://route-egypt-api.herokuapp.com/signup" , user);

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

    { apiMessage.length==0 ? "" :  <h5 className="alert text-center alert-danger"> email already registered </h5> }

      <div className="col-md-6">
        <div className="registerImg">
          <img src="gaming.ebaf2ffc84f4451d.jpg" className='w-100' alt="" />
        </div>
      </div>
      <div className="col-md-6 half py-4">
        
        <div className="forminputs">
          <form className='w-100' onSubmit={ submitUser }>
          <h4 className='my-4 mt-5 text-center'>Create My Account!</h4>

          <div className="registerForm">

          <input onChange={getUser} type="text" id='first_name' className='form-control  me-auto mb-3' placeholder='First Name' />

          <input onChange={getUser} type="text" id='last_name' className='form-control  ms-auto mb-3' placeholder='Last Name' />

          <input onChange={getUser} type="email" id='email' className='w-100 form-control mb-3' placeholder='Email Address' />

          <input onChange={getUser} type="number" id='age' className='w-100 form-control mb-3' placeholder='Age' />

          <input onChange={getUser} type="Password" id='password' className='w-100 form-control mb-3' placeholder='Password' />

          <button className='form-control py-2'>Create Account</button>

          </div>
          </form>
          <div className="textInfo">
            <p>This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target="_blank">Privacy Policy</a> and <a href="https://policies.google.com/privacy" target="_blank">Terms of Service</a> apply.</p>
          </div>
          <div className="areUin">
            <p>Already a member? <a href="login">Log In</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </section>
  </>
}
