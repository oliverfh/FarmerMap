function renderPost() {
    let head = ``
    head = `
    <div class="renderTweets">
    <div class="card">
    <div style="background-color:blue">
        <div class="card-image">
            <h1 style="color:white" id="author">Author Here</h1>
        </div>
        </div>
        <p class="card-content" text-align:"center">Listing here</p>

        <div class="btn-group">
        <button id="like">Like: </button>
        <button id="retweet">Retweet: </button>
        <button id="reply">Reply</button>
      </div> 
    </div>
    </div>
    `
   
    return head;
}