const inputfield = document.getElementById("search");
console.log(inputfield);
const locationbtn = document.getElementById("getLoc");
console.log(locationbtn);
const  wicon = document.getElementById("WeatherIcon");


let api;
let apiAirPollution;
let forcast;

function positions(info){
    console.log(info.coord)
    getAir1(info.coord)
    getForcast1(info.coord)
}

function getPosition(city){
    const shubham = "3cc45f7586ffca82229a5b84561b8399";
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${shubham}`;
    
    
    fetch(api)
    .then(response => response.json())
    .then(result => positions(result));
}


inputfield.addEventListener("keyup" , (e) =>{
    if(e.key == "Enter" && inputfield.value != ""){
        
        requestApi(inputfield.value);
        getPosition(inputfield.value)
        
    }
});

locationbtn.addEventListener("click" , () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess , onError);
        navigator.geolocation.getCurrentPosition(getAir, onError)
        navigator.geolocation.getCurrentPosition(getForcast, onError)
        navigator.geolocation.getCurrentPosition(getF, onError)
    }else{
        alert("your browser not support geolocation api");
    }
});


function onError(err) {
    infotxt.innerText = err.message;
    infotxt.classList.add("error");
}

function onSuccess(position) {
    const {latitude, longitude  } = position.coords;
    console.log(latitude, longitude)
    const shubham = "3cc45f7586ffca82229a5b84561b8399";
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${shubham}`;
    
    fetch(api)
    .then(response => response.json())
    .then(result => weatherdetails(result));
}

function getForcast(position){
    const {latitude, longitude } = position.coords;
    const shubham = "3cc45f7586ffca82229a5b84561b8399";
    forcast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${shubham}`

    fetch(forcast)
    .then(response => response.json())
    .then(result => fetchForcastData(result));
}

function getForcast1(position){
    const {lon, lat } = position;
    const shubham = "3cc45f7586ffca82229a5b84561b8399";
    forcast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${shubham}`

    fetch(forcast)
    .then(response => response.json())
    .then(result => fetchForcastData(result));
}
//creating on more funcc :> 
function getF(position){
    const {latitude, longitude } = position.coords;
    const shubham = "3cc45f7586ffca82229a5b84561b8399";
    forcast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${shubham}`

    fetch(forcast)
    .then(response => response.json())
    .then(result => fetchForcastData1(result));
}
//
function getAir(position){
    const {latitude, longitude } = position.coords;
    const shubham = "3cc45f7586ffca82229a5b84561b8399";
    apiAirPollution = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${shubham}`
    
    
    fetch(apiAirPollution)
    .then(response => response.json())
    .then(result => getDetail(result));
}

function getAir1(position){
    const {lon, lat } = position;
    const shubham = "3cc45f7586ffca82229a5b84561b8399";
    apiAirPollution = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${shubham}`
    
    
    fetch(apiAirPollution)
    .then(response => response.json())
    .then(result => getDetail(result));
}


function  requestApi(city) {
    const shubham = "3cc45f7586ffca82229a5b84561b8399";
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${shubham}`;
    
    
    fetch(api)
    .then(response => response.json())
    .then(result => weatherdetails(result));
}



function getP(){
    fetch(apiAirPollution)
    .then(response => response.json())
    .then(result => air(result));
}


function calcTime(data){
    // Unix timestamp from OpenWeather API
const sunriseTimestamp = data;

// Convert timestamp to milliseconds (required by Date object)
const sunriseMilliseconds = sunriseTimestamp*1000;

// Create a new Date object
const sunriseDate = new Date(sunriseMilliseconds);

// Extract individual components of the sunrise time
const sunriseHours = sunriseDate.getUTCHours();
const sunriseMinutes = sunriseDate.getUTCMinutes();
const sunriseSeconds = sunriseDate.getUTCSeconds();

// Convert 24-hour to 12-hour format
const sunriseHours12 = sunriseHours % 12 || 12;

// Determine AM/PM
const sunriseAmpm = sunriseHours >= 12 ? 'PM' : 'AM';

// Format the sunrise time as a string
const formattedSunriseTime = `${sunriseHours12}:${sunriseMinutes} ${sunriseAmpm}`;
return formattedSunriseTime;
}


function weatherdetails(info) {
   
    // infotxt.classList.replace("pending", "error");
    if(info.cod == "404"){
        const head = document.getElementById("highlights-label")
        head.innerText = `${inputfield.value} isn't a valid city name`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const sunrise = calcTime(info.sys.sunrise);
        const sunset = calcTime(info.sys.sunset);
        const visibility = info.visibility;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp, pressure} = info.main;


        if(id == 800){
            wicon.src = "assets/icons/clear.png";
        }else if(id >= 200 && id <= 232){
            wicon.src = "assets/icons/storm.png";
        }else if(id >= 600 && id <= 622){
            wicon.src = "assets/icons/snow.png";
        }else if(id >= 701 && id <= 781){
            wicon.src = "assets/icons/haze.png";
        }else if(id >= 801 && id <= 804){
            wicon.src = "assets/icons/cloud.png";
        }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
            wicon.src = "assets/icons/rain.png";
        }

        const t = document.getElementById("temperature")
        const d = document.getElementById("description")
        const l = document.getElementById("loc")
        const h = document.getElementById("humidity")
        const p = document.getElementById("Pressure")
        const v = document.getElementById("vis")
        const f = document.getElementById("feels")
        const sr = document.getElementById("Sunrise")
        const ss = document.getElementById("Sunset")
        const deg = Math.floor(temp);
       
        t.innerText = `${deg}`
        d.innerText = description;
        l.innerText = `${city}, ${country}`;
        h.innerText = `${humidity}%`;
        p.innerText = `${pressure} hPa`;
        v.innerText = `${visibility} m`;
        f.innerText = Math.floor(feels_like);
        sr.innerText = sunrise;
        ss.innerText = sunset;
        
    }
}

function getDetail(info){
    if(info.cod == "404"){
        const head = document.getElementById("highlights-label")
        head.innerText = `${inputfield.value} isn't a valid city name`;
    }else{
        const t = document.getElementById("pm2_5")
        const d = document.getElementById("so2")
        const l = document.getElementById("no2")
        const h = document.getElementById("o3")

        const f1 = document.getElementById("Pm2_5")
        const f2 = document.getElementById("So2")
        const f3 = document.getElementById("No2")
        const f4 = document.getElementById("O3")

        let v1 = info.list[0].components.pm2_5;
        let v2 = info.list[0].components.so2;
        let v3 = info.list[0].components.no2;
        let v4 = info.list[0].components.o3;

        t.innerText = v1
        d.innerText = v2
        l.innerText = v3
        h.innerText = v4

        if(v1<=25){
            f1.style.backgroundColor = "green"
            f1.style.color = "black"
            f1.innerText = "Good";
        }else if(v1>25 && v1<=50){
            f1.style.backgroundColor = "yellow"
            f1.style.color = "black"
            f1.innerText = "Fair"
        }else if(v1>50 && v1<=100){
            f1.style.backgroundColor = "orange"
            f1.style.color = "black"
            f1.innerText = "Poor"

        }else{
            f1.style.backgroundColor = "red"
            f1.style.color = "black"
            f1.innerText = "Very Poor"
            alert(`${inputfield.value} is under danger condition as per PM2.5 safty level`)
            const email = prompt("enter your email");
            console.log(email)

                emailjs.init("_aBn1LTGsSYctUPlb");

                function sendEmail() {
                    emailjs.send("service_j3vtsta", "template_nf57fyi", {
                    to_name: email,
                    from_name: "Nikhil Jadhav",
                    message_html: "Hello, this is a simple HTML email!",
                    }).then(
                    function(response) {
                        console.log("Email sent successfully:", response);
                    },
                    function(error) {
                        console.log("Email failed to send:", error);
                    }
                    );
                }

        }

        if(v2>=0 && v2<= 0.1){
            f2.style.backgroundColor = "green"
            f2.style.color = "black"
            f2.innerText = "Good";
        }else if(v1>0.1 && v1<=0.2){
            f2.style.backgroundColor = "yellow"
            f2.style.color = "black"
            f2.innerText = "Fair"
        }else if(v1>0.2 && v1<=0.5){
            f2.style.backgroundColor = "orange"
            f2.style.color = "black"
            f2.innerText = "Poor"
        }else{
            f2.style.backgroundColor = "red"
            f2.style.color = "black"
            f2.innerText = "Very Poor"
        }

        if(v3>0 && v3<=50){
            f3.style.backgroundColor = "green"
            f3.style.color = "black"
            f3.innerText = "Good";
        }else if(v3>= 51 && v3<=100){
            f3.style.backgroundColor = "yellow"
            f3.style.color = "black"
            f3.innerText = "Fair"
        }else if(v3>=101 && v1<=150){
            f3.style.backgroundColor = "orange"
            f3.style.color = "black"
            f3.innerText = "Poor"
        }else{
            f3.style.backgroundColor = "red"
            f3.style.color = "black"
            f3.innerText = "Very Poor"
        }

        if(v4>0 && v4<=50){
            f4.style.backgroundColor = "green"
            f4.style.color = "black"
            f4.innerText = "Good";
        }else if(v4>=51 && v4<=100){
            f4.style.backgroundColor = "yellow"
            f4.style.color = "black"
            f4.innerText = "Fair"
        }else if(v4>=101 && v4<=150){
            f4.style.backgroundColor = "orange"
            f4.style.color = "black"
            f4.innerText = "Poor"
        }else{
            f4.style.backgroundColor = "red"
            f4.style.color = "black"
            f4.innerText = "Very Poor"
        }
    }
}
function fetchForcastData(info){
    if(info.cod == "404"){
        const head = document.getElementById("highlights-label")
        head.innerText = `${inputfield.value} isn't a valid city name`;
    }else{
        // const now = info.list[0].dt_txt;
        // const formatter = new Intl.DateTimeFormat('en-US',{
        //     hour:'numeric',
        //     hour12: false,
        //     minute:'numeric',
        //     weekday:'long',
            
        // });
        // console.log('Date string: ',now.toString());
        // console.log(now)
        const t = document.getElementById("d1")
        const d = document.getElementById("d2")
        const l = document.getElementById("d3")
        const h = document.getElementById("d4")
        const i = document.getElementById("d5")
        const j = document.getElementById("d6")
        //id for class label-1
        const m = document.getElementById("m1")
        const n = document.getElementById("m2")
        const o = document.getElementById("m3")
        const p = document.getElementById("m4")
        const q = document.getElementById("m5")
        const r = document.getElementById("m6")
        //const y = document.getElementById("y1")
        console.log(info)
        t.innerText = info.list[0].main.temp
        d.innerText = info.list[1].main.temp
        l.innerText = info.list[2].main.temp
        h.innerText = info.list[3].main.temp
        i.innerText = info.list[4].main.temp
        j.innerText = info.list[5].main.temp

        m.innerText = info.list[0].dt_txt
        n.innerText = info.list[1].dt_txt
        o.innerText = info.list[2].dt_txt
        p.innerText = info.list[3].dt_txt
        q.innerText = info.list[4].dt_txt
        r.innerText = info.list[5].dt_txt
        // y.innerText = info.list[0].dt_txt
        
    }
    
}
function fetchForcastData1(info){
    if(info.cod == "404"){
        const head = document.getElementById("highlights-label")
        head.innerText = `${inputfield.value} isn't a valid city name`;
    }else{
        
        // const ab = document.getElementById("t1")
        // const bc = document.getElementById("t2")
        // const cd = document.getElementById("t3")
        // const ef = document.getElementById("t4")
        // const gh = document.getElementById("t5")
        // const ij = document.getElementById("t6")
        // const kl = document.getElementById("t7")
        // const mn = document.getElementById("t8")
        // const op = document.getElementById("t9")
        // const qr = document.getElementById("t10")
        // const st = document.getElementById("t11")
        // const uv = document.getElementById("t12")
        // const wx = document.getElementById("t13")
        // const yz = document.getElementById("t14")
        
        const ab = document.getElementById("tem1")
        const bc = document.getElementById("tem2")
        const cd = document.getElementById("tem3")
        const ef = document.getElementById("tem4")
        const gh = document.getElementById("tem5")
        const ij = document.getElementById("tem6")
        const kl = document.getElementById("tem7")
        const mn = document.getElementById("tem8")
        const op = document.getElementById("tem9")
        const qr = document.getElementById("tem10")
        const st = document.getElementById("tem11")
        const uv = document.getElementById("tem12")
        const wx = document.getElementById("tem13")
        const yz = document.getElementById("tem14")
        //for temperature
        ab.innerText = info.list[0].main.temp
        bc.innerText = info.list[1].main.temp
        cd.innerText = info.list[2].main.temp
        ef.innerText = info.list[3].main.temp
        gh.innerText = info.list[4].main.temp
        ij.innerText = info.list[5].main.temp
        kl.innerText = info.list[6].main.temp
        //For Wind speed
        //mn.innerText = info.list[0].wind.speed
        mn.innerText=`${ info.list[0].wind.speed} km/h`;
        op.innerText = `${info.list[1].wind.speed} km/h`;
        qr.innerText = `${info.list[2].wind.speed} km/h`;
        st.innerText = `${info.list[3].wind.speed} km/h`;
        uv.innerText = `${info.list[4].wind.speed} km/h`;
        wx.innerText = `${info.list[5].wind.speed} km/h`;
        yz.innerText = `${info.list[6].wind.speed} km/h`;
    }
    
}
