$(function() {
    onLoad();
  });


async function onLoad() {
    $('#main').on('click','#makechatroompost',makeListing);
    $('#main').on('click','#listingcancel',cancelListing);
    $('#main').on('click','#listingsubmit',handlePost);


    let t =(localStorage.getItem('token'));
  try {
    const x = await axios({
      method: 'GET',
      url: 'http://localhost:3000/account/status',
      headers: {
        Authorization: "Bearer " + t
      }
  });
  $('#main').prepend(`<div id="welcomediv" ><h3><strong id="welcomeword">Welcome, ${x.data.user.data.fullName}</strong></div>`)
  
  let token = localStorage.getItem('token')
    const result = await axios({
      method: 'GET',
      url: 'http://localhost:3000/private/posts',
      headers: {
        Authorization: "Bearer " + token
      }
  });
  for(let i=0; i<result.data.result.length;i++) {
    renderMessages(result.data.result[i]);
  }


} catch (error) {
    $('#main').append(`<div align="Center"><h2>Ooops you're not logged in.</h2> <br> <a href="index.html">Click here to login!</a> </div>`);

}
}

async function renderMessages(data) {
    let head =`
    <section class="section box ">
    <div id="rendered",class="card" align="center">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4" align="center">${data.fullName}</p>
          <p class="subtitle is-6" align="center">@${data.userName}</p>
        </div>
      </div>    
      <div class="content">
      <div>
        <p>${data.message}</p>
      </div>
      <div>
        ${data.datetime}
        </div>
          <br/>
        </div>
        <div>
        <p>${data.fullName}'s favorite quote:</p><em>${data.quote}</em>

        </div>
      </div>
    </div>
  </div>
  </section >
    `
    $('#posts').prepend(head);
}


async function makeListing(e) {
    let t =(localStorage.getItem('token'));
    //console.log("x")
  
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
          <h3>What's on your mind?</h3>
          <textarea id="message"></textarea>
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
      alert("error found")
  
    }
  
  }
  
  function cancelListing(e) {
    
    $("#mListing").remove();
  
  }


  async function handlePost(e) {

    try {

        let message = $('#message').val();
        let currentdate = new Date(); 
        let datetime = currentdate.getMonth() + "/"
                  + (currentdate.getDate()+1)  + "/" 
                  + currentdate.getFullYear() + " @ "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes();
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
      const getQuote = await axios({
          method: 'GET',
          url: 'http://localhost:3000/user/quote',
          headers: {
              Authorization: "Bearer " + token
              }
      });
     let quote = (getQuote.data.result.quote);
      const r = await axios({
          method: 'POST',
          url: 'http://localhost:3000/private/posts',
          headers: {
            Authorization: "Bearer " + token
          },
          data: {
            data: {
              "message": message,
              "userName": userName,
              "fullName": fullName,
              "datetime": datetime,
              "quote": quote,
            },
            type: "merge"
          },
        });
        console.log(r)
  renderCard(userName, fullName, message, datetime, quote);
  cancelListing();

    } catch (error) {
        if (window.confirm('Woah, you tried to post without setting a quote! Travel over to your profile page to set something freindly.')) {
window.location.href='profile.html';
};
    }
  }

  function renderCard(userName, fullName, message, datetime, quote) {
    let head =`
    <section class="section box  ">
    <div id="rendered",class="card" align="center">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4" align="center">${fullName}</p>
          <p class="subtitle is-6" align="center">@${userName}</p>
        </div>
      </div>    
      <div class="content">
      <div>
        <p>${message}</p>
      </div>
      <div>
        ${datetime}
        </div>
          <br/>
          <div>
          <p>${fullName}'s favorite quote:</p><em>${quote}</em>

          </div>
        </div>
      </div>
    </div>
  </div>
  </section>
  
    `
    $('#posts').prepend(head);
  }