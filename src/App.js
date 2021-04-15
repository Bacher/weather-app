import {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    async function getWeatherData() {
      const resp = await fetch('https://api.weatherapi.com/v1/current.json?key=7baecf5da5e64adb9cd191103211504&q=Vladivostok&aqi=no');

      console.log('resp:', resp);

      if (resp.ok) {
        const response = await resp.json();
        console.log('response:', response);
        setData(response);
      }
    }
    getWeatherData();
  }, [])

  if (!data) {
    return (
      <div className="App">
        Loading...
      </div>
    )
  }

  return (
    <div className="App">
      <div className="привет" style={{display:'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100%'}}>
        <div style={{fontSize: 20}}>
          City: {data.location.name}
        </div>
        <div style={{fontSize: 18, margin: 20}}>
          Current weather: <b>{data.current.temp_c} °C</b>, feels like {data.current.feelslike_c} °C.
        </div>

        <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <div className='Earth'>Earth</div>
          <div className='WeatherSun'>
            {data.current.temp_c > 10 ?
              <img src='https://ssl.gstatic.com/onebox/weather/48/sunny.png' />
              :
              <img src='https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png' />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
