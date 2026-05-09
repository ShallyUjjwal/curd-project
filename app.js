const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const userModel = require('./models/user');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    
app.use(express.static(path.join(__dirname,'public'  )));
 // Serve static files from the 'public' directory

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/read', async (req, res)=>{
   let users = await userModel.find();
    res.render('read', { users });
})

app.post('/create', async (req, res)=>{
    let createusers = await userModel.create({
        name: req.body.name,
        email: req.body.email,
        imageurl: req.body.imageurl });
        res.redirect('/read');
})

app.get('/delete/:id', async (req, res)=>{
   let deletedUser = await userModel.findOneAndDelete({_id: req.params.id});

   res.redirect('/read');})

app.get('/edit/:id', async (req, res)=>{
   let user = await userModel.findOne({_id: req.params.id}).then((user)=>{
    res.render('edit', {user});
   })
})

app.post('/update/:id', async (req, res)=>{
   let {name, email, imageurl} = req.body;
   let user = await userModel.findOneAndUpdate({_id: req.params.id},  {name, email, imageurl},{new: true}).then((user)=>{
    res.redirect('/read');
   })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});