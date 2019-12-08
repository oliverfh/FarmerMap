//import {setToken} from "../../config/Token";
//import getAxiosInstance from "../../config/Axios";


$(function() {
    loadShit();
});

function loadShit() {
    $('#reg').on("click", "#makeAcc", makeAccount);
    //$('#login').on("click", ".cancel", handleCancel);
}

async function makeAccount(e) {
    e.preventDefault();
    const name = $('#name').val();
    const email = $('#email').val();
    const pass = $('#pass').val();
    console.log(name);
    console.log(email);
    console.log(pass);

    const result = await axios({
        method: 'POST',
        url: 'http://localhost:3000/account/create',
        data: {
            "name": email,
            "pass": pass,
            "data": {
                "fullName": name
            }

        }
    });
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