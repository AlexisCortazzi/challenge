import './App.css';
import { useEffect, useState } from 'react';
import Card from './components/card';
import axios from 'axios';
import day  from './day.jpg'
import afternoon  from './afternoon.jpg'
import night  from './night.jpg'
import '../src/components/card.css'
import icon01d from '../src/assest/icons/01d.svg'
import icon02d from '../src/assest/icons/02d.png'
import icon03d from '../src/assest/icons/03d.svg'
import icon04d from '../src/assest/icons/04d.png'
import icon09d from '../src/assest/icons/09d.png'
import icon10d from '../src/assest/icons/10d.svg'
import icon11d from '../src/assest/icons/11d.svg'
import icon13d from '../src/assest/icons/13d.svg'
import icon50d from '../src/assest/icons/50d.svg'
import icon01n from '../src/assest/icons/01n.svg'
import icon02n from '../src/assest/icons/02n.png'
import icon10n from '../src/assest/icons/10n.png'
import refreshArrow from '../src/assest/icons/refresh.svg'
import arrow from '../src/assest/icons/arrow.svg'


function App() {

  
  //Creamos los estados que van a tener la data y también el loader 
  const [city, setCity] = useState('Buenos Aires');
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState(new Date())
  const [refresh, setRefresh] = useState(false)

  const API_KEY = '10f5fc043a0815d3b2db734dd151a90a';

  //Función que obtiene la hora de la API y la parsea para poder ser utilizada en la lógica de cambiar el fondo según el horario.
  const handleDate = (timezone) => {
    const horaActualUTC = new Date();
    horaActualUTC.setUTCHours(horaActualUTC.getUTCHours() + (timezone/3600));
    horaActualUTC.toUTCString();
    setDate(new Date(horaActualUTC).getUTCHours())
  }

  const handleDateTime = (timezone) => {
    const horaActualUTC = new Date();
    horaActualUTC.setUTCHours(horaActualUTC.getUTCHours() + (timezone / 3600));
    let horario = horaActualUTC.toUTCString();
    let indiceDosPuntos = horario.lastIndexOf(":");
    let fechaSinSegundos = horario.substring(0, indiceDosPuntos);
    return fechaSinSegundos;
}


  const icons = (icono) => {
    return ({
        "01d": icon01d,
        "02d": icon02d,
        "03d": icon03d,
        "04d": icon04d,
        "09d": icon09d,
        "10d": icon10d,
        "11d": icon11d,
        "13d": icon13d,
        "50d": icon50d,
        "01n": icon01n,
        "02n": icon02n,
        "03n": icon03d,
        "04n": icon04d,
        "09n": icon09d,
        "10n": icon10n,
        "11n": icon11d,
        "13n": icon13d,
        "50n": icon50d
    }[icono]) || icono
}
  
  
  //Useeffect que realiza el fetcher para obtener la información de la API y guardarla en diversos estados que luego serán manipulados y mostrados.
  //Posee dependencias que a la hora de cambiar de ciudad o refrescar la data se vuelve a hacer el llamado a la API.
  //Si ocurre un error en la petición se imprimirá un cartel tanto por pantalla como por consola sobre la naturaleza del mismo. 
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
    //Intervalo de un minuto para refrescar la información.
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  },[city, refresh])
  

  //Mostramos el componente card pasándole todas las props que necesita. También en la url se hace una lógica para que dependiendo la hora que sea en la ciudad que elijamos el fondo cambie. 
  return (
    <div className="App" style={{ backgroundImage: data ? `url(${date >= 7 && date <= 17 ? day : date > 17 && date <= 20 ? afternoon : night })` : `url(${data})`, backgroundSize: "cover" }}>
      {/* <Card loading={loading} data={data} setCity={setCity} setRefresh={setRefresh}/> */}
      <div className="card-container">
            {
                loading ? <div className='loader-container'><span className='loader'></span></div> :
                    data === "empty" ? <div className='loader-container'><span className='no-data'>No se encontró contenido</span></div> :
                        <>
                            <div className='card-subcontainer'>
                                <div className='card-countrys'>
                                    <div className='card-select'>
                                        <select className='card-select' id="opciones" name="opciones" onClick={(event) => setCity(event.target.value)}>
                                            <option value='Buenos Aires'>Argentina</option>
                                            <option value='Berlin'>Alemania</option>
                                            <option value='Bogota'>Colombia</option>
                                            <option value='Madrid'>España</option>
                                            <option value='Paris'>Francia</option>
                                            <option value='Moscu'>Rusia</option>
                                            <option value='Londres'>Inglaterra</option>
                                            <option value='Tokio'>Japon</option>
                                        </select>
                                        <img src={arrow} className='arrow-icon' />
                                    </div>
                                    <img src={refreshArrow} onClick={() => setRefresh(prevState => !prevState)} className='refresh-icon' />
                                </div>

                                <div className='body-container'>
                                    <img className='card-icon' src={icons(data.weather[0].icon)} alt="Temperatura Actual" />
                                    <div className='status-container'>
                                        <span className='card-temperature'>{Math.round(data.main.temp)}°</span>
                                        <span>{data.weather[0].main}</span>
                                        <span>{data.name}</span>
                                        <span>Sensación térmica: {Math.round(data.main.feels_like)}°</span>
                                    </div>
                                </div>
                            </div>
                            <div className='time-container'>
                                <span className='card-time'>{handleDateTime(data.timezone)}</span>
                            </div>
                        </>
            }
        </div>
    </div>
  );
}

export default App;
