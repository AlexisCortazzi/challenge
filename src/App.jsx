import './App.css';
import { useEffect, useState } from 'react';
import Card from './components/card';
import axios from 'axios';
import day  from './day.jpg'
import afternoon  from './afternoon.jpg'
import night  from './night.jpg'


function App() {

  
  //Creamos los estados que van a tener la data y tambien el loader 
  const [city, setCity] = useState('Buenos Aires');
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState(new Date())
  const [refresh, setRefresh] = useState(false)

  const API_KEY = '10f5fc043a0815d3b2db734dd151a90a';

  //Funcion que obtiene la hora de la API y la parsea para poder ser utilizada en la logica de cambiar el fondo segun el horario.
  const handleDate = (timezone) => {
    const horaActualUTC = new Date();
    horaActualUTC.setUTCHours(horaActualUTC.getUTCHours() + (timezone/3600));
    horaActualUTC.toUTCString();
    setDate(new Date(horaActualUTC).getUTCHours())
  }
  
  
  //Useeffect que realiza el fetcher para obtener la informacion de la API y guardarla en diversos estados que luego seran manipulados y mostrados.
  //Posee dependencias que a la hora de cambiar de ciudad o refrescar la data se vuelve a hacer el llamado a la API.
  //Si ocurre un error en la peticion se imprimira un cartel tanto por pantalla como por consola sobre la naturaleza del mismo. 
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await axios
  //     .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
  //     .then((res, req) => {
  //       console.log(res)
  //       setData(res.data)
  //       handleDate(res.data.timezone)
  //       setLoading(false)
  //     })
  //     .catch((error) => {
  //       console.log(error.message)
  //       setData("empty")
  //       setLoading(false)
  //       alert(error.message)
  //     })
  //   }
  //   fetchData()
  // },[city, refresh])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
        handleDate(data.timezone);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData("empty");
        setLoading(false);
        alert('Error fetching data: ' + error.message);
      }
    };
    fetchData();
  }, [city, refresh]);

  //Mostrarmos el componente card pasadonle todas las props que necesita. Tambien en la url se hace una logica para que dependiendo la hora que sea en la ciudad que elijamos el fondo cambie. 
  return (
    <div className="App" style={{ backgroundImage: `url(${day})`, backgroundSize: "cover" }}>
      <Card loading={loading} data={data} setCity={setCity} setRefresh={setRefresh}/>
    </div>
  );
}

export default App;
