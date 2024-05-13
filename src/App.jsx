import './App.css';
import { useEffect, useState } from 'react';
import Card from './components/card';
import axios from 'axios';
import day  from './day.jpg'
import afternoon  from './afternoon.jpg'
import night  from './night.jpg'


function App() {

  
  //Creamos los estados que van a tener la data y también el loader 
  const [city, setCity] = useState({ value: 'Buenos Aires', label: 'Argentina' });
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState(day)
  const [refresh, setRefresh] = useState(false)

  const API_KEY = '10f5fc043a0815d3b2db734dd151a90a';

  //Función que obtiene la hora de la API y la parsea para poder ser utilizada en la lógica de cambiar el fondo según el horario.
  const handleDate = (timezone) => {
    const horaActualUTC = new Date();
    horaActualUTC.setUTCHours(horaActualUTC.getUTCHours() + (timezone/3600));
    horaActualUTC.toUTCString();
    let date = (new Date(horaActualUTC).getUTCHours())
    setDate(date >= 7 && date <= 17 ? "day" : date > 17 && date <= 20 ? "afternoon" : "night")
  }
  
  
  //Useeffect que realiza el fetcher para obtener la información de la API y guardarla en diversos estados que luego serán manipulados y mostrados.
  //Posee dependencias que a la hora de cambiar de ciudad o refrescar la data se vuelve a hacer el llamado a la API.
  //Si ocurre un error en la petición se imprimirá un cartel tanto por pantalla como por consola sobre la naturaleza del mismo. 
  useEffect(() => {
    const fetchData = async () => {
      await axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${API_KEY}&units=metric`)
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
    //Intervalo de un minuto para refrescar la información.
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  },[city, refresh])
  

  //Mostramos el componente card pasándole todas las props que necesita. También en la url se pasa el state date para que dependiendo la hora que sea en la ciudad que elijamos el fondo cambie. 
  return (
    <div className="App" style={{ backgroundImage: date ? `url(${date === "day" ? day : date === "afternoon" ?  afternoon : night})` : `url(${day})`, backgroundSize: "cover" }}>
      <Card time={date} city={city} refreshing={refresh} loading={loading} data={data} setCity={setCity} setRefresh={setRefresh}/>
    </div>
  );
}

export default App;
