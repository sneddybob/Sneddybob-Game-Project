fetch("https://codingtemplezillowapi.azurewebsites.net/api/cities?county=cook")
	.then(function(response){
		response.json()
		.then(function(jsonData){
			jsonData
			.filter(function(e){return e.state == "IL"})
            .forEach(function(e){ fetch("https://codingtemplezillowapi.azurewebsites.net/api/cities/"+e.uniqueCityId)
            .then(function(response){
                response.json()
                .then(function(jsonData){
                    jsonData
                    .filter(function(e){ return e.medianListingPriceAllHomes})
                    .forEach(function(e){ if (e.date == "2017-08-31T00:00:00")
                     {console.log(e.date + " "+ e.regionName +":"+ "$"+e.medianListingPriceAllHomes.toFixed(2));}})
                })
            })
            ;})
		})
    })
    
