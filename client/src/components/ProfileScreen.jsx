import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from "react-apollo"
import {
  USER_LOGOUT, USER_UPDATE_REQUEST,
   USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from "../constants/userConstants";
import Cookie from 'js-cookie';
import {USER_UPDATE_PASSWORD,USER_UPDATE} from "../queries/User_Queries"

function ProfilScreen(props)
{
    const [name,setName]=useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username,setUsername]=useState('');
    const [telephone, setTelephone] = useState();
    const [newpassword, setNewpassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();
    
    useEffect(() => {
      if (userInfo) {
        setEmail(userInfo.email);
        setName(userInfo.name);
        setUsername(userInfo.username);
        setTelephone(userInfo.tel)
      }  
      return () => {
      };
    }, [userInfo])

    const handleLogout = () => {
      dispatch({type:USER_LOGOUT});
      Cookie.remove("userInfo");
      localStorage.clear();
      props.history.push("/");
    }
 
    const [updatePassword]=useMutation(USER_UPDATE_PASSWORD,{variables:{
      oldpassword:password,
      newpassword:newpassword
    },
    onError:err=>{
      console.log(err)
    },
    onCompleted:response=>{
      if(response.updateUserPassword.status==200)
        dispatch({ type: USER_UPDATE_SUCCESS, payload:response.updateUserPassword.message })
      else
        dispatch({ type: USER_UPDATE_FAIL, payload:response.updateUserPassword.error });
    }
    })
      
    const [updateUser,{loading,error}] = useMutation(USER_UPDATE, {
      variables:{
       name,
       email,
       username,
       tel:telephone
      },
      onCompleted: response => {
          if(response.updateUser.status==200)
            dispatch({ type: USER_UPDATE_SUCCESS, payload:{...response.updateUser.user,token:userInfo.token}})
          else
            dispatch({ type: USER_UPDATE_FAIL, payload:response.updateUser.error });
          
      }   
    })

    const submitHandlerpassword=()=>{
      dispatch({ type:USER_UPDATE_REQUEST});
      if(password!==newpassword)
      updatePassword()
      else 
      dispatch({ type: USER_UPDATE_FAIL, payload:"password incrorrect" });
    }
    const submitHandler=(e) => {
      e.preventDefault();
        if(name===''||username===''||email===''||telephone==='') 
         dispatch({ type: USER_UPDATE_FAIL, payload:"empty field(s)" });
        else updateUser()
    }
   
    return (
      <>
      <div className="profile">
      <div className="profile-info">
        <div className="form">
          <form onSubmit={submitHandler} >
            <ul className="form-container">
              <li>
                <h2>User Profile</h2>
              </li>
              <li>
                {loading && <p>loading ....</p>}
                {error && <p>{error}</p>}
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}/>
                
              </li>
              <li>
                <label htmlFor="email">Email</label>
                <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                
              </li>
              <li>
                <label htmlFor="username">Username</label>
                <input value={username} type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)}/>            
              </li>
              <li>
             <label htmlFor="telephone">Telephone</label>
                <input value={telephone} type="tel" id="telephone" name="telephone" onChange={(e) => setTelephone(e.target.value)}/>  
              </li>
              <li>
                <button type="submit" className="button primary">Update</button>
              </li>
              <li>
                <label htmlFor="password">old Password</label>
                  <input value={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
              </li>
              <li>
                <label htmlFor="newpassword">new Password</label>
                <input value={newpassword} type="password" id="newpassword" name="newpassword" onChange={(e) => setNewpassword(e.target.value)}/>
              </li>
              <li>
                <button type="button" onClick={submitHandlerpassword}  className="button primary">Update Password</button>
              </li>
              <li>
                <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button>
              </li>
            </ul>
          </form>          
        </div>
      </div>  
    </div>
  </>  
  )
}
export default ProfilScreen