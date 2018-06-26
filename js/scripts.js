/**
 *  IMPORTANT: APPID has to be replaced ; Daily forecast is based on free API which is not accurate
 */

$(document).ready(function(){

	var city = "San Jose, CA";
	//var city = "Woodinville";

	function getURL(city){
		var res = {};
		if(city === "San Jose, CA"){
			res.todayUrl = "http://api.openweathermap.org/data/2.5/weather?q=SAN JOSE,US&APPID=a940b68593a288f566a03f5fa84aad45";
			res.forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=SAN JOSE,US&APPID=a940b68593a288f566a03f5fa84aad45";
		}
		else if(city === "Woodinville, WA"){
			var res = {};
			res.todayUrl = "http://api.openweathermap.org/data/2.5/weather?q=Woodinville,US&APPID=a940b68593a288f566a03f5fa84aad45";
			res.forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=Woodinville,US&APPID=a940b68593a288f566a03f5fa84aad45";
		}
		return res;
	}

	function getWeatherInfo(){
		var weatherSiteURL = getURL(city);
		var todaysWeatherData = {};
		var cleansedForeCastData = {};
		var weekday = new Array(7);
			weekday[0] =  "Sun";
			weekday[1] = "Mon";
			weekday[2] = "Tue";
			weekday[3] = "Wed";
			weekday[4] = "Thu";
			weekday[5] = "Fri";
			weekday[6] = "Sat";

		$.getJSON(weatherSiteURL.todayUrl,function(result){
			todaysWeatherData.temp = Math.round((result.main.temp - 273.15)* 1.8000 + 32.00);
			todaysWeatherData.condition = result.weather[0].main;
		    //console.log(JSON.stringify(todaysWeatherData));
		    //start to update data into UI
		    document.getElementById("today_temp").innerHTML = todaysWeatherData.temp + "&deg;"
		    document.getElementById("today_location").innerHTML = city;
		    document.getElementById("today_condition").innerHTML = todaysWeatherData.condition;
		});

		$.getJSON(weatherSiteURL.forecastUrl,function(result){

			for(var i = 0; i < 5; i++){
				var ele = result.list[i*8+3];
				var tempObj = {};
		    	tempObj.temp = Math.round((ele.main.temp - 273.15)* 1.8000 + 32.00);
		    	tempObj.condition = ele.weather[0].main;
		    	tempObj.time = new Date(ele.dt_txt); //2017-09-18 21:00:00
		    	tempObj.weekday = weekday[tempObj.time.getDay()];
		    	var tmpInt = i+1;
		    	cleansedForeCastData["day"+tmpInt] = tempObj;

		    	document.getElementById("day"+tmpInt+"_weekday").innerHTML = tempObj.weekday;
		    	//only have Clouds Rain Clear Snow Mist for now. 

		    	document.getElementById("day"+tmpInt+"_condition").innerHTML = "<img src=\"img/" + tempObj.condition.toLowerCase() + ".png\" alt=\""+ tempObj.condition +"\">";
		    	document.getElementById("day"+tmpInt+"_temp").innerHTML = tempObj.temp + "&deg;";

			}

		});
	}
	getWeatherInfo();
	var startTask = setInterval(getWeatherInfo, 60*60*1000);

});