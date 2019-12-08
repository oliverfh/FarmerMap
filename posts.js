function posts() {
  for(let i = 0; i < 3; i++) {
    $("#posts").append(renderPost());
}
$('#posts').on('click','#makelisting',makeListing);

}

function renderPost() {
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
  console.log("fired");
  let head = `
  <div class="card" align="center">
    <div class="card-content">
  
      <div class="content">
        Bruh ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris.
        <br>
      </div>
    </div>
  </div>
  `
  $("#posts").prepend(head);
}

$(function() {
  posts();
});
