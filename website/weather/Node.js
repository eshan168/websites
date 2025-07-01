const input = document.getElementById("addressinput")
const output = document.getElementById("weatherdisplay")
const image = document.getElementById("symbol")

const cold = "images/cold.jpg"
const mild = "images/clouds.jpg"
const hot = "images/sun.jpg"

async function getCoords(){

    const address = input.value

    try{
    let response = await fetch(`https://geocode.maps.co/search?q=${address}&api_key=684b71249a52d829766865xau8d1b4e`)

    if (!response.ok){
        throw new Error("Not valid Address")
    }

    const data = await response.json()
    const coords = [data[0].lat,data[0].lon]
    return coords
    }
    catch(error){
        console.error(error)
        output.innerHTML = `Invalid`
        image.src = ""
    }
}

async function getWeather(lat,lon){
    try{
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`)

    if (!response.ok){
        throw new Error("Not valid Coordinates")
    }

    const data = await response.json()
    const temp = Math.round((data.current.temperature_2m*9/5 + 32) * 1000) / 1000
    output.innerHTML = `${temp}°F`

    if (temp < 50){
        image.src = cold
    }
    if (temp >= 50){
        image.src = mild
    }
    if (temp >= 70){
        image.src = hot
    }

    }
    catch(error){
        console.error(error)
        output.innerHTML = `Invalid`
        image.src = ""
    }
}

async function displayWeather(){
    
    const coords = await getCoords(input)
    await getWeather(coords[0],coords[1])

}
