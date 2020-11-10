export default class Blog {
  constructor(id, title, body, likes, dislikes,image,date) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.el = null;
    this.likes = likes;
    this.dislikes = dislikes;
    this.image = image;
    this.date = new Date(date);
  }
  getelement() {
    var temp = this.gettemplate(
      this.title,
      this.body,
      this.likes,
      this.dislikes,
      this.image,
      this.date
    );
    var temp_div = document.createElement("div");
    temp_div.innerHTML = temp;
    this.el = temp_div.children[0];
    this.eventlisteners();
    return this.el;
  }
  gettemplate(title, body, likes, dislikes,image,date) {
    if(image!="undefined"){

    return `
                <div class="my_blog">
                    <div class="blog-title"> ${title}</div>

                    <div class="blog-titlebar">Posted on : ${date}</div>

                    <div class="blog-img"><img src="/bLOG-BACKEND/img/${image}"></div>

                    <div class="blog-body">
                    <p class="line">${body.substring(0,500)}<span class="btn1"><button class="btn btn-link"> ....Read More</button></span><span class="slide hidden">${body.substring(500,body.length)}</span><span class="btn2 hidden"><button class="btn btn-link">Read Less</button></span></p>
                    </div>

                    <div class="blog-likes">
                        <button class="like-button btn-danger"><i class="fas fa-thumbs-up"></i></button>
                        <span class="like-count">
                        ${likes}</span>
                    </div>
                    <div class="blog-dislikes">
                    <button class="dislike-button btn-dark"><i class="fas fa-thumbs-down"></i></button>
                    <span class="dislike-count">
                    ${dislikes}</span>
                    </div>
                    <div class="blog-comments">
                        <h4 class="h4">Comments</h4>
                        <input type="text" class="form-control comment_in"> 
                        <button class="btn btn-warning post">Post</button> 
                    </div>
                    <div class="admin-options"><button class="delete-button btn-danger"><i class="fa fa-trash-o"></i></button>
                    <button class="edit-button btn-primary"><i class="fa fa-pencil-square-o"></i></button>
                    </div>
                    <hr class="hr">
                </div>
      `;
    }
    else{
      return `
                <div class="my_blog">
                    <div class="blog-title"> ${title}</div>

                    <div class="blog-titlebar">Posted on : ${date}</div>

                    <div class="blog-img"></div>

                    <div class="blog-body">
                    <p class="line">${body.substring(0,500)}<span class="btn1"><button class="btn btn-link"> ....Read More</button></span><span class="slide hidden">${body.substring(500,body.length)}</span><span class="btn2 hidden"><button class="btn btn-link">Read Less</button></span></p>
                    </div>

                    <div class="blog-likes">
                        <button class="like-button btn-danger"><i class="fas fa-thumbs-up"></i></button>
                        <span class="like-count">
                        ${likes}</span>
                    </div>
                    <div class="blog-dislikes">
                    <button class="dislike-button btn-dark"><i class="fas fa-thumbs-down"></i></button>
                    <span class="dislike-count">
                    ${dislikes}</span>
                    </div>
                    <div class="blog-comments">
                        <h4 class="h4">Comments</h4>
                        <input type="text" class="form-control comment_in"> 
                        <button class="btn btn-warning post">Post</button> 
                    </div>
                    <div class="admin-options"><button class="delete-button btn-danger"><i class="fa fa-trash-o"></i></button>
                    <button class="edit-button btn-primary"><i class="fa fa-pencil-square-o"></i></button>
                    </div>
                    <hr class="hr">
                </div>
      `;
    
    }
  }
  eventlisteners() {
    const likebtn = this.el.querySelector(".like-button");
    const deleteBtn = this.el.querySelector(".delete-button");
    var like_count = this.el.querySelector(".like-count");
    var liked = 0;

    likebtn.onclick = () => {
      console.log(like_count.innerHTML);
      var likecnt = Number(like_count.innerHTML);
      if (liked == 0) {
        likecnt = likecnt + 1;
        liked = 1;
        like_count.innerHTML = likecnt.toString();
      } else {
        likecnt = likecnt - 1;
        liked = 0;
        like_count.innerHTML = likecnt.toString();
      }
      console.log(likecnt);

      console.log("lol");
    };

    const dislikebtn = this.el.querySelector(".dislike-button");
    var dislike_count = this.el.querySelector(".dislike-count");
    var disliked = 0;

    dislikebtn.onclick = () => {
      console.log(dislike_count.innerHTML);
      var dislikecnt = Number(dislike_count.innerHTML);
      if (disliked == 0) {
        dislikecnt = dislikecnt + 1;
        disliked = 1;
        dislike_count.innerHTML = dislikecnt.toString();
      } else {
        dislikecnt = dislikecnt - 1;
        disliked = 0;
        dislike_count.innerHTML = dislikecnt.toString();
      }
      console.log(dislikecnt);

      console.log("lol");
    };

    const postbutton = this.el.querySelector(".post");
    var comment_in = this.el.querySelector(".comment_in");
    postbutton.onclick = () => {
      if (comment_in.value != null) {
        console.log(comment_in.value);
      } else {
        console.log("error");
      }
    };
    deleteBtn.onclick = async () => {
      const res = await fetch(`http://localhost:3000/api/blogs/${this.id}`, {
        method: "DELETE",
      });
      location.reload();
    };
    var btn1 = this.el.querySelector(".btn1");
    var slide = this.el.querySelector(".slide");
    var btn2 = this.el.querySelector(".btn2");
    btn1.onclick = () =>{
      btn1.classList.add("hidden");
      slide.classList.remove("hidden");
      btn2.classList.remove("hidden");
    };
    btn2.onclick = () =>{
      btn1.classList.remove("hidden");
      slide.classList.add("hidden");
      btn2.classList.add("hidden");
    };
  }
}
