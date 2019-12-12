//import {setToken} from "../../config/Token";
//import getAxiosInstance from "../../config/Axios";
//window.location.href = "login/mainpage.html";



$(function() {
    handleEvents();
});

function handleEvents() {
    $('#reg').on("click", "#makeAcc", makeAccount);
    //$('#login').on("click", ".cancel", handleCancel);
}

async function makeAccount(e) {
    e.preventDefault();
    const name = $('#name').val();
    const username = $('#username').val();
    const pass = $('#pass').val();
    const quote ='';
    //todo: add indication that account trying to be made has already been registered?
    try {
        const result = await axios({
            method: 'POST',
            url: 'http://localhost:3000/account/create',
            data: {
                "name": username,
                "pass": pass,
                "data": {
                    "fullName": name,
                }
            }
        });
        console.log("success")
        window.location.href = "/index.html";
    } catch (error) {
        alert("Username has already been taken. Please try another one.")
    }
    
    // try{
    //     await axios.post(`/create`,{email,pass,data});
    //     return true;
    // } catch(error) {
    //     return false;
    // }

}

// export async function createAccount({name, pass}) {
//     try {
//       await axios.post(`/create`, {name, pass,data});
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }