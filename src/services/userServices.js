import axios from'./axios';

class userService{

    getUsers(){

        return axios.get('/user/all');
    }

    deleteUser(userId){
         return axios.delete('/user/'+userId);
    }

    addUser(user){
         return axios.post('/user/add/',user);
    }

    getUserById(userId){
         return axios.get('/user/'+userId);
    }

    updateUser(userId,userUpdateDetails){
          return axios.put('/user/update'+userId,userUpdateDetails);
    }

}

export default userService;