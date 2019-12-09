function posts() {
  for(let i = 0; i < 3; i++) {
    $("#posts").append(renderPost());
}
$('#main').on('click','#makelisting',makeListing);

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
          <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
      </div>
    </div>
    `
    return head;
}

function makeListing(e) {
  let head = `
  <div id="#postCenter",class="card" align="center">
    <div class="card-content">
  
      <div id="toSell",class="content">
        <span>Write your listing</span>
        <h3>What are you selling?</h3>
        <input id="title",type = text></input>
        <h3>Give a description of your produce</h3>
        <textarea id="description"></textarea>
        <h3>Street Address</h3>
        <input id="streetad",type=text></input>
        <h3>State(Abbreviation)</h3>
        <input id="state",type="text"></input>
        <h3>ZIP Code</h3>
        <input id="zip",type="text"></input>
        <br>
      </div>
    </div>
  </div>
  `
  $("#postCenter").replaceWith(head);
}

$(function() {
  posts();
});
