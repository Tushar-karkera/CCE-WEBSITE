const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const feedback = require('./database/schema')
const dotenv = require('dotenv');
const three_routes = require('./routes/route3rdsem')
dotenv.config();
const port = 3000 //default port used


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./templates/htmlpages/home.html"))
})


app.use(express.urlencoded({
    extended: true
}))




//using template folder as static folder
app.use(express.static(path.join(__dirname, '/templates')))


//home path for the website


//3rd sem configured routes 

app.use('/3rdsemnotes',three_routes)
app.get('/intermediate3rdsem', (req, res) => {
    res.sendFile(path.join(__dirname, "./templates/htmlpages/3rdsem/intermediate3rdsem.html"))
})



//4th sem configured routes
app.get('/4thsemnotes', (req, res) => {
    res.sendFile(path.join(__dirname, "./templates/htmlpages/4thsem/4thsempage.html"))
})
app.get('/intermediate4thsem', (req, res) => {
    res.sendFile(path.join(__dirname, "./templates/htmlpages/4thsem/intermediate4thsem.html"))
})



//below routes are yet to be configured

app.get('/5thsem', (req, res) => {
    res.sendFile(path.join(__dirname, "./templates/htmlpages/home.html"))
})


//services are routed below such as about page and feedback form

app.get('/feedback', (req, res) => {
    res.sendFile(path.join(__dirname, "./templates/htmlpages/formpage.html"))
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, "./templates/htmlpages/About.html"))
})


//feedback form post handle method

app.post('/submit', async (req, res) => {
    let nxt ="/"
    let userfeedback = await new feedback({
        name: req.body.name,
        email: req.body.email,
        description: req.body.description
    })
    
    await userfeedback.save((err)=>{
        if(err){
            nxt = "/feedback"           //if error nxt saves value "feedback"
        }
        else{
            nxt = "/"                   //if no error nxt saves value "/"                 
        }
        res.redirect(`${nxt}`)          //redirect to nxt
    })
})



//app listening on a port
app.listen(port, async(err, res) => {
    
    await mongoose.connect(`mongodb+srv://${process.env.user}:${process.env.password}@cce-database.ehckl.mongodb.net/${process.env.database}?retryWrites=true&w=majority`)
        .then((res) => {
            //console.log('connected to database')
        })
        .catch((err) => {
            //console.log(process.env)
            //console.log(err)
        })
    //console.log(`listening on port ${port}`)

})

//redirection of a submit route if used by an end user
app.get('/submit', (req, res) => {
    res.redirect('/')
})
