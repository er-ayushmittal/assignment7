let text=document.querySelector("input");
let btn=document.getElementById("btn");
let weather=document.getElementById("weather");
let loc=document.getElementById("location");
let speed=document.getElementById("speed");
let temp=document.getElementById("temp");
let min=document.getElementById("min");
let max=document.getElementById("max");
let time=document.getElementById("time");
let body=document.getElementById("body");

let arr=["mist","cloudy","sunny","foggy","rain","haze","clear sky","thunder","snow"]
start();
function start(){
    getweather("mumbai")
}
btn.addEventListener("click",(e)=>{
    e.preventDefault();
    let input=text.value;
    getweather(input);
    text.value="";
});
function getweather(input){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=444d1faecf69c1d4dbc0138ae5a67596`)
    .then((result)=>{
        return result.json()
    })
    .then((data)=>{
        let txt=data.weather[0].description;
        if(txt.includes("rain"))
        {
            body.style.backgroundImage=`url('img/rain.jpg')`;
        }
        else if(txt.includes("cloud"))
        {
            body.style.backgroundImage="url('img/cloudy.jpg')";
        }
        else if(arr.includes(txt))
        {
            body.style.backgroundImage=`url('img/${txt}.jpg')`;
        }
        else
        {
            body.style.backgroundImage=`url('img/default.jpg')`;
        }
        weather.innerHTML=txt.toUpperCase();
        txt=data.sys.country;
        loc.innerHTML=input.toUpperCase()+','+txt;
        txt=data.wind.speed;
        speed.innerHTML="Speed "+txt+" kms";
        txt=parseInt(data.main.temp-273);
        temp.innerHTML=txt+"\u00B0C";
        txt=parseInt(data.main.temp_min-273);
        let txt2=parseInt(data.main.temp_max-273);
        min.innerHTML=txt+"\u00B0C (min)";
        max.innerHTML=" , "+txt2+"\u00B0C (max)";
        txt=new Date().toDateString();
        time.innerHTML=txt;
    })
    .catch((err)=>{
        alert("Enter Valid Name");
        console.log(err.message);
    });
}