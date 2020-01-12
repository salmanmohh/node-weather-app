const form = document.querySelector('form')
const search = document.querySelector('input')
const search_loc = document.querySelector('#location')
const forecast = document.querySelector('#forecast')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const address = search.value
    const url = '/weather/?address='+address
    
    search_loc.textContent = 'Loading...'
    forecast.textContent = ''
    
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                search_loc.textContent = data.error
                forecast.textContent = ''
            }else{
                search_loc.textContent = data.location
                forecast.textContent = data.forecast
            }
        })
    })
})