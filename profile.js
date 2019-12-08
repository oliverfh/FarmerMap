function renderProfile() {
    let head = ``
    head = `
    <div class="card" align="center">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4" align="center">(Name)</p>
            <p class="subtitle is-6" align="center">@(username)</p>
            <p class="subtitle is-6" align="center">Email: (email)</p>
          </div>
        </div>
    
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus nec iaculis mauris.
          <br>
          <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
      </div>
    </div>
    `
   
    return head;
}

$("#userprofile").append(renderProfile());