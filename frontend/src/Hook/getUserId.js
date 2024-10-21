export const getUserId = ()=>{

    const userID =  window.localStorage.getItem("userID")
    if(userID){
        return userID;
    }
    else{
        return false;
    }
} 