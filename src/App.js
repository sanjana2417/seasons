import React, { useState } from 'react';



const App = () => {
  const [city, setCity] = useState('');
  const [search, setSearch] = useState('Mumbai');
  const fetchApi = async () => {
    try {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=3b2e84bf9e699e8ca36aa2468a4c331b`;
      const response = await fetch(url);
      const resJson = await response.json();
      // console.log(resJson);
      setCity(resJson);
    } catch (error) {
      setCity("")
    }

  }


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August",
      "September", "October", "November", "December"];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`


  };
  return (
    <div className={(typeof city.main !="undefined") ? ((city.main.temp >16) ? 'app warm' : 'app'):'app'}>
      {/* {(typeof city != "undefined") ? 
      { ((city.temp >16) ? 'app warm' :'app'):'app'}}> */}
    {/* <div className={(typeof city.main !="undefined") ? ((city.main.temp >16) ? 'app warm' : 'app'):'app'}> */}

      <main>
        <div className="search-box">
          <form onSubmit={(e) => {
            e.preventDefault();
            fetchApi();
            console.log(e)
          }
          }>

            <input className="search-bar"
              placeholder="Search..."
              type="search"
              name="search"
              onChange={e => setSearch(e.target.value)}
              value={search}
            // onKeyPress={search}
            />
          </form>
        </div>

       
        {(typeof city.main != "undefined") ? (
          <div>
            <div className="location-box">
     
     <div className="location">{city.name},{city.sys.country}</div>
     <div className="date">{dateBuilder(new Date())}</div>
   </div>
   <div className="weather-box">
     <div className="temp">
      
       {Math.round(city.main.temp)}° C
       <h3 className="tempmin_max">
         Min:{(city.main.temp_min)}° C | Max:{(city.main.temp_max)}° C
       </h3>
     </div>
    
     <div className="weather"> {city.weather[0].main}</div>
   </div>
          </div>
         
          

        ) : (<p className="errormsg">No Data Found</p>)}

      </main>

    </div>
  );
}

export default App;
