import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation,useQuery } from 'react-apollo';
import {USER_LIST_UPDATE_FAIL,USER_LIST_UPDATE_SUCCESS,USER_LIST_SUCCESS,USER_ADDED_SUCCESS,USER_ADDED_FAIL,USER_DELETED} from "../constants/userConstants"
import axios from 'axios';
import {USERS_LIST,USER_REGISTER,USER_UPDATE_ADMIN,USER_DELET} from "../queries/User_Queries"


export default function UsersScreen()
{
    const [modalVisible, setModalVisible] = useState(false);
    const [uploading, setUploading] = useState(false);
    
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const [tel, setTel] = useState('');
    const [type, setType] = useState('');
    const dispatch = useDispatch();

    const userList=useSelector(state=>state.userList);
    const {users}=userList

    

    

    

    
     
    const { loading, error, data }=useQuery(USERS_LIST,{
      onCompleted:(data)=>{
          console.log(data)
          if(data.users.status==200)
           dispatch({type:USER_LIST_SUCCESS,payload:data.users.users})
          
       }
    })

    const [createUser]=useMutation(USER_REGISTER,{
        variables:{
            username,
            name,
            email,
            password,
            type:type,
            tel:tel,
            avatar:image
           },
           onError:err=>console.log(err),
           onCompleted:(response)=>{
            if(response.createUser.status==201)
            {
              dispatch({ type: USER_ADDED_SUCCESS, payload: response.createUser.user});
            }
            else
            {
              dispatch({ type: USER_ADDED_FAIL, payload: response.createUser.error});
            }
           }      
    })
    const [updateUser]=useMutation(USER_UPDATE_ADMIN,{variables:{
      id:id,
      name,
      email,
      username,
      tel,
      avatar:image
    },
    onCompleted:(response)=>{
      if(response.updateUserByAdmin.status==200)
            dispatch({ type: USER_LIST_UPDATE_SUCCESS, payload:{user:response.updateUserByAdmin.user,
               id:response.updateUserByAdmin.user._id}})
      else
            dispatch({ type: USER_LIST_UPDATE_FAIL, payload:response.updateUser.error });
    }
    });
    const [deleteUser]=useMutation(USER_DELET)

    
    const submitHandler = (e) => {
        e.preventDefault();
       if(id) updateUser()
       else createUser()
    };
    
    const openModal = (user) => {
      if(user._id)
      {
        setId(user._id)
        setModalVisible(true);
        setName(user.name)
        setUsername(user.username)
        setEmail(user.email)
        setTel(user.tel)
        setType(user.type)
      }
      else{
        setId("")
        setModalVisible(true);
        setName("")
        setUsername("")
        setEmail("")
        setTel("")
        setType("")
      } 
    };

    const deleteHandler = (user) => {
        deleteUser({variables:{userid:user._id}})
        dispatch({type:USER_DELETED,payload:user._id})
    };

     
    const uploadFileHandler = (e) => {
        const file=e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append(`Image`,file)
        setUploading(true)
        axios.post('http://localhost:5000/api/uploads/s3',bodyFormData, {headers: {'Content-Type': 'multipart/form-data'}})
        .then((response) => {
            setImage(response.data)
            setUploading(false);
             })
        .catch((err) => {
            setUploading(false);
        });       
      };
      
 return (<div className="content content-margined">
      <div className="product-header">
        <h3>Users</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create User
        </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create User</h2>
              </li>
              <li>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
              </li>

              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Username</label>
                <input
                  type="text"
                  name="price"
                  value={username}
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="points">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
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
              {!id && (<li>
                <label htmlFor="brand">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </li>)}
              
              <li>
                <label htmlFor="countInStock">Telephone</label>
                <input
                  type="text"
                  name="telephone"
                  value={tel}
                  id="telphone"
                  onChange={(e) => setTel(e.target.value)}
                ></input>
              </li>
              {!id && (<li>
                  Type
                  <select
                    value={type}
                    onChange={(e) => { setType(e.target.value);}}>
                    
                      <option value="admin">Admin</option>
                      <option value="responsable">Responsable</option>
                    
                  </select>
                </li>
              )}
              <li>
                <button type="submit" className="button primary">
                  {id ? 'Update' : 'Create'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>email</th>
              <th>telephone</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.tel}</td>
                <td>{user.type}</td>
                <td>
                  <button className="button" onClick={() => openModal(user)}>
                    Edit
                  </button>{' '}
                  <button
                    className="button"
                    onClick={() => deleteHandler(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>)


}