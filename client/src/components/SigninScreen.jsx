import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import gql from "graphql-tag";
import { useLazyQuery } from 'react-apollo';
import Cookie from 'js-cookie';
import {USER_SIGNIN_REQUEST,USER_SIGNIN_SUCCESS,USER_SIGNIN_FAIL} from "../constants/userConstants"
import {USER_LOGIN} from "../queries/User_Queries"

function SigninScreen(props)
{
    


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const userSignin = useSelector(state => state.userSignin);
    const { loading, error } = userSignin;
    
    const [Login]=useLazyQuery(USER_LOGIN,{
        variables:{
         email,
         password,
        },
        onCompleted: (response) => {
          
           if(response.login.status==200)
            {
              dispatch({ type: USER_SIGNIN_SUCCESS, payload: {...response.login.user,token:response.login.token}});
              localStorage.setItem('token', response.login.token)
              Cookie.set('userInfo', JSON.stringify({...response.login.user,token:response.login.token}));
              props.history.push("/profile")
            }
            else
            {
              dispatch({ type: USER_SIGNIN_FAIL, payload: response.login.error});
            }
        }
     })

    const submitHandler=(e) => {
        e.preventDefault();
        dispatch({ type: USER_SIGNIN_REQUEST});
        Login()
        
    }    
    return (
        <div className="form">
        <form onSubmit={submitHandler} >
          <ul className="form-container">
            <li>
              <center><h2>SignIn</h2></center> 
            </li>
            <li>
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
            </li>
            
            <li>
              <label htmlFor="email">
                Email
              </label>
              <input  type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
              
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input  type="password" id="password" name="password" autocomplete="off" onChange={(e) => setPassword(e.target.value)}/>
              
            </li>
           
        
            <li>
              <button type="submit" className="button primary">SignIn</button>
            </li>
            <li>
              
              <Link to= "/register" className="button secondary text-center" >Register</Link>
     
            </li>
     
          </ul>
        </form>
      </div> 
     )
}
export default SigninScreen