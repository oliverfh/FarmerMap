
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
  console.log(title, description,streetad,state,zip);

  const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
  });
  async function createList({title,description,streetad,state,zip}) {
    return await pubRoot.post(`/listings/`, {
      data: {title, description, streetad,state,zip},
      type: "merge"
    })
  }

  await createList({title,description,streetad,state,zip})
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
console.log("posted");
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

