
async function posts() {
  for(let i = 0; i < 3; i++) {
    $("#posts").append(renderPost());
}





$('#main').on('click','#makelisting',makeListing);
$('#main').on('click','#listingcancel',cancelListing);
$('#main').on('click','#listingsubmit',handlePost);

}

function renderPost() {
  //todo: change to format we want.
  //first need to retrieve data
    let head = ``
    head = `
    <div class="card" align="center">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4" align="center">John Smith</p>
            <p class="subtitle is-6" align="center">@johnsmith</p>
          </div>
        </div>    
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus nec iaculis mauris. <a>@bulmaio</a>.
          <a href="#">#css</a> <a href="#">#responsive</a>
          <br>
        </div>
      </div>
    </div>
    `
    return head;
}



async function handlePost(e) {
  let title = $('#title').val();
  let description = $('#description').val();
  let streetad = $('#streetad').val();
  let state = $('#state').val();
  let zip = $('#zip').val();
  let city = $('#city').val();
  let currentdate = new Date(); 
  let datetime = currentdate.getMonth() + "/"
                + (currentdate.getDate()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();
  const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
  });
  let token =(localStorage.getItem('token'));
  // console.log("Bearer " + token)
    const result = await axios({
      method: 'GET',
      url: 'http://localhost:3000/account/status',
      headers: {
        Authorization: "Bearer " + token
      }
  });
  let userName = result.data.user.name;
  console
  async function createList({title,description,streetad,state,zip,city,datetime,userName}) {
    return await pubRoot.post(`/listings/`, {
      data: {title, description, streetad,state,zip,city,datetime,userName},
      type: "merge"
    })
  }
  // let token =(localStorage.getItem('token'));
  console.log(`Bearer` + token);

  const accRoot = new axios.create({
    baseURL: "http://localhost:3000/user"
  });
  async function createUsr({title,description,streetad,state,zip,city,datetime},token) {
    return await accRoot.post(`/listings/`, {
      headers: {
        Authorization: "Bearer " + token
        },
      data: {title, description, streetad,state,zip,city,datetime},
      type: "merge"
    })
  }
  await createList({title,description,streetad,state,zip,city,datetime,userName})
  //await createUsr({title,description,streetad,state,zip,city,datetime},token);
//   const result = await axios({
//     method: 'POST',
//     url: 'http://localhost:3000/public/',
//     data: {
//       "title": title,
//       "description": description,
//       "streetad": streetad,
//       "state": state,
//       "zip": zip
//     }
// });
renderCard(title, description, streetad, state, zip, city, datetime);
console.log("posted");
}

async function renderCard(title, description, streetad, state, zip, city, datetime) {
  let token =(localStorage.getItem('token'));
// console.log("Bearer " + token)
  const result = await axios({
    method: 'GET',
    url: 'http://localhost:3000/account/status',
    headers: {
      Authorization: "Bearer " + token
    }
});
console.log(result.data.user.name)


  let head =`
  <div class="card" align="center">
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4" align="center">${result.data.user.data.fullName}</p>
        <p class="subtitle is-6" align="center">@${result.data.user.name}</p>
      </div>
    </div>    
    <div class="content">
    <div>
      <h6 class="cardsubtitles">What I'm Selling</h6>
      <p>${title}</p>
    </div>
    <div>
      <h6 class="cardsubtitles">Description:</h6>
      <p>${description}</p>
    </div>
    <div>
      <h6 class="cardsubtitles">Address</h6>
      <p>${streetad}</p>
    </div>
    <div>
      <h6 class="cardsubtitles">City: </h6>
      ${city}, ${state} ${zip}
      ${datetime}
    </div>
      <br/>
    </div>
  </div>
</div>

  `
  $('#posts').prepend(head);
}



function makeListing(e) {
  let head = `
  <div id="#mListing",class="card" align="center">
    <div class="card-content">
      <div id="toSell",class="content">
        <h3>What are you selling?</h3>
        <textarea id="title",type = text class="listinginput"></textarea>
        <h3>Give a description of your produce</h3>
        <textarea id="description" class="listinginput"></textarea>
        <h3>Street Address</h3>
        <input id="streetad",type="text" class="listinginput"></input>
        <h3>State(Abbreviation)</h3>
        <input id="state",type="text" class="listinginput"></input>
        <h3>ZIP Code</h3>
        <input id="zip",type="text" class="listinginput"></input>
        <h3> City </h3>
        <input id="city",type="text" class="listinginput"></input>
        <br>
        <button id="listingsubmit" type="submit">Post</button>
        <button id="listingcancel">Cancel</button>
      </div>
    </div>
  </div>
  `
  $("#postCenter").append(head);
}

function cancelListing(e) {
  let head = `<div id="postCenter"></div>`;
  $("#mListing").remove();
}

$(function() {
  posts();
});

