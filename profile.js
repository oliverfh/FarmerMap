function renderProfile(data) {
  let head =`
  <div class="card" align="center">
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4" align="center">${data.fullName}</p>
        <p class="subtitle is-6" align="center">@${data.userName}</p>
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
      <h6 class="cardsubtitles">City: </h6>
      ${data.city}, ${data.state} ${data.zip}
      ${data.datetime}
    </div>
      <br/>
      <button id="listinglike">Like</button>
      <button id="listingsave">Save</button>
      <button id="listingedit">Edit</button>
      <button id="listingdelete">Delete</button>
    </div>
  </div>
</div>

  `
  $('#userprofile').prepend(head);
}



async function onLoad() {
  let token = localStorage.getItem('token')

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
  renderProfile(result.data.result[i]);

}
}

function logout() {
  //console.log(token);
  localStorage.removeItem('token');
 // console.log(localStorage.getItem('token'));
  window.location.href = "index.html";


}

$(function() {
  onLoad();
});
