export default class Blog {
  constructor(id,title, body, likes, dislikes) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.el = null;
    this.likes = likes;
    this.dislikes = dislikes;
  }
  getelement() {
    var temp = this.gettemplate(
      this.title,
      this.body,
      this.likes,
      this.dislikes
    );
    var temp_div = document.createElement("div");
    temp_div.innerHTML = temp;
    this.el = temp_div.children[0];
    this.eventlisteners();
    return this.el;
  }
  gettemplate(title, body, likes, dislikes) {
    return `
                <div class="my_blog">

                    <div class="blog-title"> ${title}</div>

                    <div class="blog-titlebar">Posted on : lol</div>

                    <div class="blog-img"><img src="fort_collins_winter.jpg"></div>

                    <div class="blog-body"> ${body}
                    </div>

                    <div class="blog-likes">
                        <button class="like-button"><img src="images.png"></button>
                        <span class="like-count">
                        ${likes}</span>
                    </div>
                    <div class="blog-dislikes">
                    <button class="dislike-button"><img src="dis.jpg"></button>
                    <span class="dislike-count">
                    ${dislikes}</span>
                    </div>
                    <div class="blog-comments">
                        <h5>Comments</h5>
                        ye kya bavasir bana diye ho
                        <input type="text" class="comment_in"> 
                        <button class="post">Post</button> 
                    </div>
                </div>
      `;
  }
  eventlisteners() {
    const likebtn = this.el.querySelector(".like-button");
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
  }
}
