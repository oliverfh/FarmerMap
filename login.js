//import {setToken} from "../../config/Token";
//import getAxiosInstance from "../../config/Axios";


$(function() {
    handleEvents();
});

function handleEvents() {
    $('#log').on("click", "#loginbutton", login);
    //$('#login').on("click", ".cancel", handleCancel);
    localStorage.setItem("address","default")
}

async function login(e) {
    e.preventDefault();
    const username = $('#username').val();
    const pass = $('#pass').val();
    console.log(username);
    console.log(pass);
    //todo: add indication that account trying to be made has already been registered?
    const result = await axios({
        method: 'POST',
        url: 'http://localhost:3000/account/login',
        data: {
            "name": username,
            "pass": pass,
        }
    });
    console.log(result);
    let token = result.data.jwt;
    console.log(token);
    localStorage.setItem('token',token);
    window.location.href = "/PostPage.html";

}

    
// let token = localStorage.getItem('token');

// export const getToken = () => {
//   return token;
// };

// export const setToken = (t) => {
//   token = t;
//   localStorage.setItem('token', t);
// };