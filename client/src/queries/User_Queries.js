import gql from "graphql-tag";

export const USERS_LIST=gql`
query{
    users 
    {
        status 
        users {_id name username email tel type avatar}
    }
}`;

export const LAZY_RESPONSABLES=gql`
query{
   LazyResponsables {
        status 
        users {_id name email username avatar}
        }
}`;

export const USER_UPDATE_PASSWORD=gql`
mutation updateUserPassword($oldpassword:String! $newpassword:String!)
{
        updateUserPassword(updateUserPasswordInput:{oldpassword:$oldpassword,newpassword:$newpassword})
        { 
                user {username name email tel} 
                status 
                error 
                message  
        }
}`;

export const USER_UPDATE=gql`
mutation updateUser($username:String! $email:String! $name:String! $tel:String!) {
  updateUser(updateUserInput:{username:$username,email:$email,name:$name,tel:$tel})
   {
        user { _id username name email tel type} 
        status 
        error 
   } 
}`;

export const USER_REGISTER=gql`
mutation ($username:String! $name:String! $email:String! $password:String! $type:String! $tel:String! $avatar:String!){
   createUser(createUserInput:{
        username:$username,
        name: $name,
        email: $email,
        password:$password,
        type:$type,
        tel:$tel,
        avatar:$avatar
                  }) 
    {
     user {_id name email username tel avatar type} 
     error 
     status
    }
}`;

export const USER_LOGIN=gql`
        query ($email:String! $password:String!){
        login(loginUserInput:{email:$email,password:$password}) 
        {
          status 
          token 
          user { _id username email name tel type} 
          error 
        }
}`;

export const USER_DELET=gql`
mutation deleteUser($userid:String!) {
    deleteUser(userid:$userid) 
    { 
            status 
            user {  _id}  
    }
}`;

export const USER_UPDATE_ADMIN=gql`
mutation updateUserByAdmin($id:String $username:String! $email:String! $name:String! $tel:String! $avatar:String) {
 updateUserByAdmin(updateUserInput:{id:$id username:$username,email:$email,name:$name,tel:$tel avatar:$avatar})
    { 
            user { _id username name email tel type} 
            status 
            error 
    } 
}`;