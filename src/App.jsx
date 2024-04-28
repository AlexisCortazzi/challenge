import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Card from './components/card';
import axios from 'axios';
import day  from './day.jpg'
import afternoon  from './afternoon.jpg'
import night  from './night.jpg'


function App() {

  
  const API_KEY = '10f5fc043a0815d3b2db734dd151a90a';
  
  const [timezone, setTimeZone] = useState(-10800)
  const [city, setCity] = useState('Buenos Aires');
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [backgroundImage, setBackgroundImage] = useState(day)
  const [date, setDate] = useState(new Date())
  const [hoursarg, setHoursArg] = new Date().toLocaleString('es-CO', 'America/Bogota');
  // const horaActualUTC = new Date().toUTCString();
  // const hora = horaActualUTC.setHours(horaActualUTC.getHours() - 5);
  const horaActualUTC = new Date();
  horaActualUTC.setUTCHours(horaActualUTC.getUTCHours() - 5);
  const horaActualUTCFormateadaMenos5 = horaActualUTC.toUTCString();


  const handleDate = (timezone) => {
    const horaActualUTC = new Date();
    horaActualUTC.setUTCHours(horaActualUTC.getUTCHours() + (timezone/3600));
    horaActualUTC.toUTCString();
    setDate(new Date(horaActualUTC).getUTCHours())
  }
  

  useEffect(() => {
    const fetchData = async () => {
      await axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then((res, req) => {
        console.log(res)
        setData(res.data)
        handleDate(res.data.timezone)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    fetchData()
  },[city])




 

  
  // console.log(data)
  // console.log(date)
  // console.log(hoursarg)
  //console.log(horaActualUTCFormateadaMenos5)

  console.log(new Date(date).getUTCHours())
  
  console.log(date)

  
  



  return (
    <div className="App" style={{ backgroundImage: data ? `url(${date >= 7 && date <= 17 ? day : date > 17 && date <= 20 ? afternoon : night })` : `url(${data})`, backgroundSize: "cover" }}>
      <Card loading={loading} data={data} setCity={setCity} />
    </div>
  );
}

export default App;
