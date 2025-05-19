const  mongoose = require('mongoose')
const path = require("path")
const express = require('express')
const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')
const cookieParser = require("cookie-parser")
const { checkForAuthenticationCookie } = require('./middlewares/authentication')
const app = express()
const PORT = 8000;

const Blog = require('./models/blog')

app.use(express.static(path.resolve('./public')))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

mongoose.connect('mongodb://127.0.0.1:27017/blogman')
.then(console.log("MongoDB is connected"))


app.get("/", async (req, res) => {
    const allBlog = await Blog.find({});
    res.render('home', {
        user: req.user,
        blogs : allBlog,
    });
});

app.use('/user', userRoute);
app.use('/blog', blogRoute);
app.listen(PORT, () => console.log("Server started"))