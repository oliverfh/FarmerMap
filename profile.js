function renderProfile(data,i) {
  let head =`
  <div id="profilecenter"></div>
  <div id="theThing",data-id="${i}",class="card" align="center">
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4" align="center">${data.fullName}</p>
        <p class="subtitle is-6" align="center">${data.contactinfo}</p>
      </div>
    </div>    
    <div class="content">
    <div>
      <h6 class="cardsubtitles">What I'm Selling</h6>
      <p>${data.title}</p>
    </div>
    <div>
      <h6 class="cardsubtitles">Description:</h6>
      <p>${data.description}</p>
    </div>
    <div>
      <h6 class="cardsubtitles">Address</h6>
      <p>${data.streetad}</p>
    </div>
    <div>
      ${data.datetime}
    </div>
      <br/>
    </div>
  </div>
</div>

  `
  $('#userprofile').prepend(head);
}



async function onLoad() {

let t =(localStorage.getItem('token'));
if(t == null) {
  $('#userprofile').append(`<div align="center"><p>You're not logged in.</p><br><a href="index.html">Click here to login!</a></br></div>`)
}

  const x = await axios({
    method: 'GET',
    url: 'http://localhost:3000/account/status',
    headers: {
      Authorization: "Bearer " + t
    }
});
$('#main').prepend(`<div id="welcomediv"><h3><strong id="welcomeword">Welcome, ${x.data.user.data.fullName}</strong></div>`)

let token = localStorage.getItem('token')
  console.log(token);
  $('#log').on('click', '#logoutbutton',logout)
  const result = await axios({
    method: 'GET',
    url: 'http://localhost:3000/user/posts',
    headers: {
      Authorization: "Bearer " + token
    }
});
//console.log(result.data);
for(let i=0; i<result.data.result.length;i++) {
  renderProfile(result.data.result[i],i);
}


$('#log').on('click','#editprofilebutton', editProfile);
$('#userprofile').on('click','#profileDelete', deletePost);
$('#userprofile').on('click','#quotecancel',cancelQuote);
$('#userprofile').on('click','#quotesubmit',submitQuote);
}

function logout() {
 //TODO remove if not logged in
     //console.log(token);
  localStorage.removeItem('token');
  // console.log(localStorage.getItem('token'));
   window.location.href = "index.html";
 


}

async function submitQuote(e) {
  let newQuote = $('#description').val();
  let token = localStorage.getItem('token');
  const result = await axios({
    method: 'POST',
    url: 'http://localhost:3000/user/quote',
    data: {
      data: {
        "quote": newQuote,
      }
    },
    headers: {
      Authorization: "Bearer " + token
    }
});
  cancelQuote();
}




async function editProfile() {
  let head = `
  <div id="editcenter">
  <div id="profilequote", data-id="t", class="card" align="center">
    <div class="card-content">
      <div id="toquote",class="content">
        <h3>What is your favorite quote?</h3>
        <textarea id="description" class="listinginput"></textarea>
        <br>
        <button id="quotesubmit" type="submit">Use as Quote</button>
        <button id="quotecancel">Cancel</button>
      </div>
    </div>
  </div>
  </div>
  `
$('#profilecenter').prepend(head);
$('#profilecenter').on('click','#quotecancel',cancelQuote);


}

function cancelQuote(e) {
 
  $("#editcenter").remove();

}

async function deletePost(e) {
  // let t = localStorage.getItem('token');

//   const x = await axios({
//     method: 'GET',
//     url: 'http://localhost:3000/user/saved',
//     headers: {
//       Authorization: "Bearer " + t
//     }
// });
// let index = $(e.target.closest('#theThing')).data("i");
// console.log(index);



//   const result = await axios({
//     method: 'DELETE',
//     url: 'http://localhost:3000/user/posts/',
//     headers: {
//       Authorization: "Bearer " + token
//     }
// });
}

$(function() {
  onLoad();
});
