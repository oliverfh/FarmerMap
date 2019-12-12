async function posts() {
  //   for(let i = 0; i < 3; i++) {
  //     $("#posts").append(renderPost());
  // }
  
  const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
  });
  
  const result = await pubRoot.get('/listings');
  if(result.data.length >=30) {
    for(let i=result.data.result.length-1; i>=0;i--) {
      renderPost(result.data.result[i]);
    }
  } else {
    for(let i=result.data.result.length-1; i>result.data.result.length-30;i--) {
      renderPost(result.data.result[i]);
    }

  }
  
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

  } catch (error){
    
  }
  // console.log("Bearer " + token)
  
  $('#main').on('click','#makelisting',makeListing);
  $('#main').on('click','#listingcancel',cancelListing);
  $('#main').on('click','#listingsubmit',handlePost);
  $('#posts').on('click','#listingsave',savePost);
  $('#main').on('click','#mapbutton',handleMap);
  
  }
  
  function renderPost(data) {
    // console.log(data)
    //todo: change to format we want.
    //first need to retrieve data
    let head =`
    <div id="rendered", data-fullName="${data.fullName}", data-contactinfo="${data.contactinfo}", data-title="${data.title}", data-description="${data.description}", data-streetad="${data.streetad}", data-datetime="${data.datetime}", class="card" align="center">
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
        <button id="listinglike">Like</button>
        <button id="listingsave">Save</button>
        <button id="mapbutton" data-address="${data.streetad}">View on Map</button>
      </div>
    </div>
  </div>
  
    `
    $('#posts').append(head);
  }
  function handleMap(e){
    e.preventDefault()
    let address = e.currentTarget.dataset.address
    
    localStorage.setItem('address',address);
    window.location.href = "/mapPage.html";
  
  }
  async function savePost(event) {
   let $rendered = $(event.target).closest('#rendered');
    let fullName =$rendered.data("fullname");
    let contactinfo = $rendered.data("contactinfo");
    let title = $rendered.data("title");
    let description = $rendered.data("description");
    let streetad = $rendered.data("streetad");
    let datetime = $rendered.data("datetime")
    let token = localStorage.getItem('token');
    console.log(fullName,contactinfo,title,description,streetad,datetime);
    const r = await axios({
      method: 'POST',
      url: 'http://localhost:3000/user/saved',
      headers: {
        Authorization: "Bearer " + token
      },
      data: {
        data: {
          "title": title,
          "contactinfo": contactinfo,
          "description": description,
          "streetad": streetad,
          "datetime": datetime,
          "fullName": fullName
        },
        type: "merge"
    
      },
    });
  console.log(r)

  }
  
  

async function handlePost(e) {
  let title = $('#title').val();
  let contactinfo = $('#contactinfo').val();
  let description = $('#description').val();
  let streetad = $('#autocomplete').val();
  // let state = $('#state').val();
  // let zip = $('#zip').val();
  // let city = $('#city').val();
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
  let fullName = result.data.user.data.fullName;
  // console
  async function createList({title,contactinfo,description,streetad,datetime,userName,fullName}) {
    return await pubRoot.post(`/listings/`, {
      data: {title, contactinfo, description, streetad,datetime,userName,fullName},
      type: "merge"
    })
  }


  // let token =(localStorage.getItem('token'));
  // console.log(`Bearer` + token);

  // const accRoot = new axios.create({
  //   baseURL: "http://localhost:3000/user"
  // });
  // async function createUsr({title,description,streetad,state,zip,city,datetime},token) {
  //   return await accRoot.post(`/listings/`, {
  //     headers: {
  //       Authorization: "Bearer " + token
  //       },
  //     data: {title, description, streetad,state,zip,city,datetime},
  //     type: "merge"
  //   })
  // }
  await createList({title,contactinfo,description,streetad,datetime,userName,fullName})
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
const r = await axios({
  method: 'POST',
  url: 'http://localhost:3000/user/posts',
  headers: {
    Authorization: "Bearer " + token
  },
  data: {
    data: {
      "title": title,
      "contactinfo": contactinfo,
      "description": description,
      "streetad": streetad,
      "datetime": datetime,
      "userName": userName,
      "fullName": fullName
    },
    type: "merge"

  },
});
renderCard(title, contactinfo, description, streetad, datetime);
cancelListing();
// console.log("posted");
}

async function renderCard(title, contactinfo, description, streetad, datetime) {
  let token =(localStorage.getItem('token'));
// console.log("Bearer " + token)
  const result = await axios({
    method: 'GET',
    url: 'http://localhost:3000/account/status',
    headers: {
      Authorization: "Bearer " + token
    }
});
// console.log(result.data.user.name)


  let head =`
  <div id="rendered", data-fullName="${result.data.user.data.fullName}", data-contactinfo="${contactinfo}", data-title="${title}", data-description="${description}", data-streetad="${streetad}", data-datetime="${datetime}", class="card" align="center">
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4" align="center">${result.data.user.data.fullName}</p>
        <p class="subtitle is-6" align="center">${contactinfo}</p>
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
      ${datetime}
      </div>
        <br/>
        <button id="listinglike">Like</button>
        <button id="listingsave">Save</button>
        <button id="mapbutton" data-address="${streetad}" >View on Map</button>
      </div> 
    </div>
  </div>
</div>

  `
  $('#posts').prepend(head);
}



async function makeListing(e) {
  let t =(localStorage.getItem('token'));

  try {
    const x = await axios({
      method: 'GET',
      url: 'http://localhost:3000/account/status',
      headers: {
        Authorization: "Bearer " + t
      }
  });
  let head = `
  <div id="postCenter">
  <div id="mListing",class="card" align="center">
    <div class="card-content">
      <div id="toSell",class="content">
        <h3>Contact Info: (Email or Phone Number)</h3>
        <input id="contactinfo" type="text" class="listinginput"></input>
        <h3>What are you selling?</h3>
        <textarea id="title",type = text class="listinginput"></textarea>
        <h3>Give a description of your produce</h3>
        <textarea id="description" class="listinginput"></textarea>
        <h3>Street Address</h3>
        <input type="text" id="autocomplete" class="listinginput" />

        <script>
          var input = document.getElementById('autocomplete');
          var autocomplete = new google.maps.places.Autocomplete(input);
          google.maps.event.addListener(autocomplete, 'place_changed', function(){
             var place = autocomplete.getPlace();
          })
        </script>
        <br>
        <button id="listingsubmit" type="submit">Post</button>
        <button id="listingcancel">Cancel</button>
      </div>
    </div>
  </div>
  </div>
  `
  $("#postCenter").replaceWith(head);

  } catch (error){
    $("#postCenter").replaceWith(`<div align="center", id="postCenter"><h3>Oops, you aren't logged in! Only logged in users can perform this action.g</h3><br><h3><a href="index.html">Click here to log in</a>
    </div>`);

  }

}

function cancelListing(e) {
  
  $("#mListing").remove();

}

$(function() {
  posts();
});

