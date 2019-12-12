function renderProfile(data,i) {
    let head =`
    <div id="theThing", data-id="${i}", class="card" align="center">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4" align="center">${data.fullName}</p>
          <p class="subtitle is-6" align="center">@${data.contactinfo}</p>
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
        <button id="profileEdit">Edit</button>
        <button id="profileDelete">Delete</button>
      </div>
    </div>
  </div>
  
    `
    $('#userprofile').prepend(head);
  }
  
  
  
  async function onLoad() {
  
  let t =(localStorage.getItem('token'));
  try {
    const x = await axios({
      method: 'GET',
      url: 'http://localhost:3000/account/status',
      headers: {
        Authorization: "Bearer " + t
      }
  });
  $('#main').prepend(`<div id="welcomediv"><h3><strong id="welcomeword">Welcome, ${x.data.user.data.fullName}</strong></div>`)
  
  let token = localStorage.getItem('token')
    const result = await axios({
      method: 'GET',
      url: 'http://localhost:3000/user/saved',
      headers: {
        Authorization: "Bearer " + token
      }
  });
  console.log(result.data.result[0]);
  if(result.data.result==null) {
    $('#main').append(`<div align="Center"><h2>Ooops you haven't saved any posts!</h2> <br> <a href="PostPage.html">Click here to save some!</a> </div>`);

  } else {
    for(let i=0; i<result.data.result.length;i++) {
        renderProfile(result.data.result[i],i);
      }
  }
//   console.log(result.data.result)

  //console.log(result.data);

  } catch (error) {
      
        $('#main').append(`<div align="Center"><h2>This is empty. Did you mean to save some posts?</h2> <br> <a href="PostPage.html">Click here to save something!</a> </div>`);

  }
  
  $('#deletediv').on('click','#profiledeletebutton', deletePost);
  }
  
  
  async function deletePost(e) {
  let t = localStorage.getItem('token');
  
  let $rendered = $(event.target).closest('#theThing');
  let index =$rendered.data("id");
//     const x = await axios({
//       method: 'GET',
//       url: 'http://localhost:3000/user/saved',
//       headers: {
//         Authorization: "Bearer " + t
//       }
//   });
  //console.log(x.data.result[index]);
// let newArr = x.data.result;
const r = await axios({
    method: 'DELETE',
    url: 'http://localhost:3000/user/saved/',
    headers: {
      Authorization: "Bearer " + t
    },
  });



location.reload();
  }
  
  $(function() {
    onLoad();
  });
  