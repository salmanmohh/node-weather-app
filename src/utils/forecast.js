const request = require('request')

const forecast=(longitude,latitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/f9ced3a117f062c5a21f0f56a54acad3/'+longitude+','+latitude+ '?units=si'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if (body.error){
            callback('Unable to find Location!',undefined)
        }else{
            const data = {
                summary: body.daily.data[0].summary,
                temperature : body.currently.temperature,
                rainProb: body.currently.precipProbability
            }
            callback(undefined,data.summary +'It\'s currently '+data.temperature+' degrees out.There is '+(data.rainProb*100)+'% chance of rain.')
        }
    })
}

module.exports = forecast