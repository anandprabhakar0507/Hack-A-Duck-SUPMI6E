import Blog from "./blog.js";

var blogs_a = [];                //array of blogs(class)
var blogs_box =document.querySelector("#my_blogs");


renderblogs();
async function get_blogs(){
    await fetch("http://localhost:3000/api/blogs")
    .then(function(resp){
        return resp.json();
    }).then(function(blog_array){
        console.log(blog_array);
        // blogs_a = [...blog_array.data.blogs];
        console.log(blogs_a);
        blog_array.data.blogs.forEach(element => {
           
            blogs_a.push(new Blog(element.title,element.body,element.likes,element.dislikes));      
        });
        console.log(blogs_a);
    });
}

async function renderblogs(){
    
    await get_blogs();
    blogs_box.innerHTML="";
    blogs_a.forEach(element => {
        console.log(element);
        console.log(blogs_box);
        
        blogs_box.appendChild(element.getelement()) ;
    });
}



