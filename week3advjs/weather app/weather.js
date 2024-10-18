//Baseurl and key for GeoCode, GeoCode transforms addresses into lang, long degrees.
//Lang and long is only supported for SMHI API to check weather.
const geocodeAPIkey = "apiKey=7b3510877ad943f8b984a6d48f8c848e";
const geocodeAPIbaseurl = "https://api.geoapify.com/v1/geocode/search?format=json&lang=sv&text=";

const smhiAPIbaseurl = "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/VARLON/lat/VARLAT/data.json";

//Config for the MutationObserver
const ObserverTarget = document.getElementById("body-container");
//We want to observe the children of .autocomplete... the tree of the div and it's characters data.
const ObserverOptions = {childList: true, subtree: true, CharacterData: true};

let TargetValue = "";

document.getElementById("SearchButton").addEventListener(("click"), () => {
    console.log(TargetValue);
    //If search button is clicked, then create the URL to get coordinates based on text address.
    geocodeTarget = `${geocodeAPIbaseurl}${TargetValue.replaceAll(/[\s,]+/g, "%")}&${geocodeAPIkey}`;
    console.log(geocodeTarget);
    //Effectively removes previous results for a new search.
    document.getElementById("weather-container").replaceChildren();
    getCoords(geocodeTarget);
});

async function getCoords(URL){
    //Encodes special characters but fewer.
    URL = encodeURI(URL);
    //Fetches the .json file with the coordinates
    fetch(URL)
        .then(response => response.json())
        .then(data => getWeather(data.results[0].lat, data.results[0].lon))
        .catch(error => {
            console.log("Error:", error);
            alert("Location not found")
        });
}

async function getWeather(lat, lon){
    //Replaces the VARLON, VARLAT with the data from the previous .json fetch. 
    //Creates a url to fetch weather data from SMHI
    requestURL = smhiAPIbaseurl.replace(/VARLON/, parseInt(lon));
    requestURL = requestURL.replace(/VARLAT/, parseInt(lat));
    console.log(lat, lon, requestURL);

    fetch(requestURL)
        .then(response => response.json())
        .then(data => parseWeather(data))
        .catch(error => {
            console.log(error);
            alert("Search out of bounds, limit search to Sweden");
        });

}

function parseWeather(data){
    console.log(data,typeof(data));
    dataCount = 0;

    //Iterates over the objects parameter timeSeries
    //And passes only the data we want to a display function
    //1 iteration represents 1 hour, until a certain number of hours. 
    //We pass along 24 hours in this case.
    for (param of data["timeSeries"]){
        if (dataCount < 25){
            displayWeather(param, param.validTime.split("T"));
            dataCount += 1;
        }
        else {
            break;
        }
    }
}

function displayWeather(data, time){
    //Gets a prestated element
    RootElement = document.getElementById("weather-container");

    //Checks to see if a div exists, based on the dates
    //If the if statement fails (returns null), the div is created.
    try {
        if (time[0] == document.getElementById(time[0]).id){
            dataElement = document.getElementById(time[0]);
        }
    }
    catch {
            //Creates a div for each timeslot
            dataElement = document.createElement("div");
            dataElement.setAttribute("id", time[0]);
            RootElement.appendChild(dataElement);
    }
    
    //Creates a table for each timeslots
    tableElement = document.createElement("table");
    tableElement.setAttribute("class", "table-container");
    dataElement.appendChild(tableElement);

    //Creates a table row for each timeslot
    tableRowElement = document.createElement("tr");
    tableRowElement.setAttribute("class", "row-container");
    tableElement.appendChild(tableRowElement);

    //Creates a table header for each time and date to be displayed
    tableHeaderElement = document.createElement("th");
    tableHeaderElement.setAttribute("class", "table-header-container");
    tableRowElement.appendChild(tableHeaderElement)

    //Creates a textNode with the passed 'time' var and appends it to the table header.
    const TimeNode = document.createTextNode(`${time[0]}, ${time[1]}`);
    tableHeaderElement.appendChild(TimeNode);

    for (dataSet of data.parameters){

        tempRowElement = document.createElement("tr");
        tempRowElement.setAttribute("class", "row-container");
        tableElement.appendChild(tempRowElement);

        //We extract each individual object. We need to extract the data from the data set that we want to display in the app. 
        //'t'=temp, 'ws'=wind speed, 'wd'=wind direction.
        //Can easily add more weather data, simply reference the SMHI API and make more switch statements.
        switch (dataSet.name){
            case 't':
                //For each case
                //Creates a table data node and a text node. Appends text node to data node and data node to row element
                tableDataElement = document.createElement("td");
                tableDataElement.setAttribute("class", "table-data");
                dataNode = document.createTextNode(`Temp: ${dataSet.values} ${dataSet.unit}`)
                tableDataElement.appendChild(dataNode);
                tempRowElement.appendChild(tableDataElement);
                break;
            case 'ws':
                tableDataElement = document.createElement("td");
                tableDataElement.setAttribute("class", "table-data");
                dataNode = document.createTextNode(`Wind speed: ${dataSet.values}${dataSet.unit}`)
                tableDataElement.appendChild(dataNode);
                tempRowElement.appendChild(tableDataElement);
                break;
            case 'wd':
                tableDataElement = document.createElement("td");
                tableDataElement.setAttribute("class", "table-data");
                dataNode = document.createTextNode(`Wind direction: ${dataSet.values} ${dataSet.unit}`)
                tableDataElement.appendChild(dataNode);
                tempRowElement.appendChild(tableDataElement);
                break;
                //Would like to use this weather symbol, but wont focus on that yet.
            //case 'wsymb2':
                //tableDataElement = document.createElement("td");
                //tableDataElement.setAttribute("class", "table-data");
               // dataNode = document.createTextNode(dataSet.values);
               // tableDataElement.appendChild(dataNode);
               // tableRowElement.appendChild(tableDataElement);
               // break;
        }
    }
}

//Creates a new MutationObserver with a callback pointer
//Checks all changes against target and it's children.
const observer = new MutationObserver(entries => {
    for (entry of entries){
        //If input-container exists and has changes made
        if (entry.target.className == "input-container"){
            //The actual user input, however Mutation reports small changes into the input field. So we need the user to click a button
            //This way we know when the input is done and we can use it. 
            TargetValue = entry.target.childNodes[0].value;
            //console.log(entry.target.childNodes[0].value); 
        }
    }
});

observer.observe(ObserverTarget, ObserverOptions);


