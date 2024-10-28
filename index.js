import express from "express"
import bodyParser from "body-parser"
const app=express();
const port=4000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
let posts=[];
app.get("/",(req,res)=>{
    res.render("index.ejs",{ posts:posts})

    
});

app.post("/submit",(req,res)=>{
    const title=req.body.title;
    const content =req.body.content;
    posts.push({title:title,content:content});
    res.redirect('/');
   
});
app.post('/delete-post/:id', (req, res) => {
    const id = req.params.id;
    posts.splice(id, 1); // Remove the post from the array
    res.redirect('/');
});

app.post('/edit-post/:id', (req, res) => {
    const id = req.params.id;
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
    };

    // Update the post in the array
    posts[id] = updatedPost; // Update the specific post using its index
    res.redirect('/'); // Redirect to the main page after editing
});



app.get("/about",(req,res)=>{
    res.render("about.ejs")
})
app.listen(port,(req,res)=>{
    console.log(`server listening on port ${port}`);
});