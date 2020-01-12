const request = require('request')

const geocode=(address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoic2FsbWFuZ3N0YXIxMjM0IiwiYSI6ImNrMnJ0NWR2NjBiaXkzbXRqaWk3OTVkdmUifQ.4jRHPkBcno1C92Rry2Ey9w&limit=1'
    request({url,json:true},(error,{body})=>{
        if (error){
            callback('Unable to connect to Geocode Services',undefined)
        }else if (body.features.length===0){
            callback('Unable to find location!',undefined)
        }else{
            const data = {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                place_name : body.features[0].place_name
            }
            callback(undefined,data)
        }
    })
}

module.exports = geocode