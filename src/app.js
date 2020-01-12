const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for Express Config
const public_directory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../src/templates/views')
const partialsPath = path.join(__dirname,'../src/templates/partials')

const app = express()
const port = process.env.PORT || 3000

//Setup handlebars andviews location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Setup Static directory to serve
app.use(express.static(public_directory))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Fatboy Salmano'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name: 'Fatboy Salmano'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Fatboy Salmano'
    })
})


//app.get('',(req,res)=>{
//    res.send('<h1>Hello Express</h1>')
//})

//app.get('/help',(req,res)=>{
//    res.send({
//        name:'salman',
//        age:20
//    })
//})

//app.get('/about',(req,res)=>{
//    res.send('<h1>About</h1>')
//})

app.get('/weather',(req,res)=>{
    if (req.query.address){
        geocode(req.query.address,(error,{longitude,latitude,place_name}={})=>{
            if(error){
                return res.send({error})
            }
            return forecast(longitude,latitude, (error, forecast_data) => {
                if(error){
                    return res.send({error})
                }
                res.send({
                    location: place_name,
                    forecast: forecast_data,
                    user_address: req.query.address
                })
              })
        })

    }else{
        res.send('ERROR: You must provide an Address')
    }
    
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'ERROR 404',
        name:'Fatboy Salmano',
        error_msg: 'This Help article doesn\'t exist!'
    })

})
app.get('*',(req,res)=>{
    res.render('error',{
        title:'ERROR 404',
        name:'Fatboy Salmano',
        error_msg:'That page doesn\'t exist'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port 3000')
})