

    

   const button = document.getElementById('b');
   
    const mymap = L.map('posMap').setView([0, 0], 1);

    const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenstreetMap</a> Contributors  ';

    const tilesUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    const tiles = L.tileLayer(tilesUrl, {
        attribution
    });
    tiles.addTo(mymap);

    
    if ("geolocation" in navigator) {
         

        navigator.geolocation.getCurrentPosition( async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            document.getElementById('lat').textContent = lat.toFixed(2) + "°";
            document.getElementById('lon').textContent = lng.toFixed(2) + "°";
            const api_url = `tempo/${lat},${lng}`;
            const fetch_response = await fetch(api_url);
            const dado = await fetch_response.json();
            const tem = dado.weather.currently.temperature;
            const temc = ((tem - 32) * 5) / 9;
            document.getElementById('tem').textContent = Math.round(temc) + "°C ";
            const sum = dado.weather.currently.summary;
            document.getElementById('sum').textContent = sum;
            console.log(dado);

            const marker = L.marker([lat, lng]).addTo(mymap);
        
            const data = {
                lat,
                lng,
                temc,
                sum
            };


            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)

            };

            const response = await fetch('/api', options);
            const json = await response.json();
            console.log(json);


        
        });

        


    } else {
        alert("I'm sorry, but geolocation services are not supported by your browser.");
    }





   

