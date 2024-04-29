import './App.css';
import { useEffect, useState } from 'react';
import Card from './components/card';
import axios from 'axios';
import day  from './day.jpg'
import afternoon  from './afternoon.jpg'
import night  from './night.jpg'


function App() {

  
  const API_KEY = '10f5fc043a0815d3b2db734dd151a90a';
  
  const [city, setCity] = useState('Buenos Aires');
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState(new Date())
  const [refresh, setRefresh] = useState(false)


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
        console.log(error.message)
        setData("empty")
        setLoading(false)
        alert(error.message)
      })
    }
    fetchData()
  },[city, refresh])


  return (
    <div className="App" style={{ backgroundImage: data ? `url(${date >= 7 && date <= 17 ? day : date > 17 && date <= 20 ? afternoon : night })` : `url(${day})`, backgroundSize: "cover" }}>
      <Card loading={loading} data={data} setCity={setCity} setRefresh={setRefresh}/>
    </div>
  );
}

export default App;
