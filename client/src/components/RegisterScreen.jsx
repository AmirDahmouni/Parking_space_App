
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from "react-apollo"

import axios from 'axios';
import {USER_REGISTER_SUCCESS,USER_REGISTER_FAIL,USER_REGISTER_REQUEST} from "../constants/userConstants"
import {USER_REGISTER} from "../queries/User_Queries"

function RegisterScreen(props)
{
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [username,setUsername]=useState('');
   const [password, setPassword] = useState('');
   const [image, setImage] = useState('');
   const [telephone, setTelephone] = useState();
   const [rePassword,setrePassword]=useState('');
   const [uploading, setUploading] = useState(false);
   const dispatch = useDispatch();

   const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
 
   const userRegister = useSelector(state => state.userRegister);
   const { loading, userInfo, error } = userRegister;

   
  
   const [Register]=useMutation(USER_REGISTER,{
      variables:{
       username,
       name,
       email,
       password,
       type:"client",
       tel:telephone,
       avatar:image
      },
      onCompleted: (response) => {
         if(response.createUser.status==201)
          {
            dispatch({ type: USER_REGISTER_SUCCESS, payload: response.createUser.user});
            props.history.push("/signin")
          }
          else
          {
            dispatch({ type: USER_REGISTER_FAIL, payload: response.createUser.error});
          }
      }
   })
   const uploadFileHandler = (e) => {
    
    const file=e.target.files[0];
    console.log(file)
    const bodyFormData = new FormData();
    console.log(bodyFormData)
    bodyFormData.append(`Image`,file)
    setUploading(true)
    axios.post('http://localhost:5000/api/uploads/s3',bodyFormData, {headers: {'Content-Type': 'multipart/form-data'}}).then((response) => {
        setImage(response.data)    
        console.log(response.data)
        setUploading(false);
      })
      .catch((err) => {
        setUploading(false);
      })
     
    };

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch({ type: USER_REGISTER_REQUEST})
      if(rePassword!==password)
      { dispatch({ type: USER_REGISTER_FAIL, payload: "password incorrect"}) }
      else 
      {
        console.log(image)
         Register();
      }
    }

   return (<div className="form">
   <form onSubmit={submitHandler} style={{marginTop:"auto"}}>
     <ul className="form-container">
       <li>
         <center><h2>Create Account</h2></center>
         
       </li>
       <li>
         {loading && <div>Loading...</div>}
         {error && <div>{error}</div>}
       </li>
       <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>}
              </li>
       <li>
         <label htmlFor="email">
           Email
         </label>
         <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
         </input>
       </li>
       <li>
         <label htmlFor="name">
           Name
         </label>
         <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
         </input>
       </li>
       <li>
         <label htmlFor="username">Username</label>
         <input type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)}>
         </input>
       </li>
       <li>
         <label htmlFor="password">Password</label>
         <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
         </input>
       </li>
       <li>
         <label htmlFor="repassword">rePassword</label>
         <input type="password" id="repassword" name="repassword" onChange={(e) => setrePassword(e.target.value)}>
         </input>
       </li>
       <li>
         <label htmlFor="telephone">Telephone</label>
         <input type="tel" id="telephone" name="telephone" onChange={(e) => setTelephone(e.target.value)}>
         </input>
       </li>
       <li>
         <button type="submit" className="button primary">Register</button>
       </li>
       <li>
         
         <Link to= "/signin" className="button secondary text-center" >Signin</Link>

       </li>

     </ul>
   </form>
 </div>
 )
}
export default RegisterScreen