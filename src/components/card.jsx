import './card.css'
import icon01d from '../assest/icons/01d.png'
import icon02d from '../assest/icons/02d.png'
import icon03d from '../assest/icons/03d.png'
import icon04d from '../assest/icons/04d.png'
import icon09d from '../assest/icons/09d.png'
import icon10d from '../assest/icons/10d.png'
import icon11d from '../assest/icons/11d.png'
import icon13d from '../assest/icons/13d.png'
import icon50d from '../assest/icons/50d.png'
import icon01n from '../assest/icons/01n.png'
import icon02n from '../assest/icons/02n.png'
import icon10n from '../assest/icons/10n.png'


export default function Card({loading, data, setCity, setRefresh}) {

    const handleDate = (timezone) => {
        const horaActualUTC = new Date();
        horaActualUTC.setUTCHours(horaActualUTC.getUTCHours() + (timezone/3600));
        return horaActualUTC.toUTCString();
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


    return (
        <div className="card-container">
            {
                loading ? <span>Cargando</span> :
                    data === "empty" ? <span>No se encontró contenido</span> : 
                    <>
                        <span className='card-location'>{data.name},</span>
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
                        <button onClick={() => setRefresh(prevState => !prevState)}>refresh</button>
                        <div className='body-container'>
                            <div className='temperature-container'>
                                <div className='image-container'><img className='card-icon' src={icons(data.weather[0].icon)} alt="Temperatura Actual"/></div>
                                <span className='card-temperature'>{Math.round(data.main.temp)}°</span>
                            </div>
                            <div className='status-container'>
                                <span>{data.weather[0].main}</span>
                                <span>Sensación térmica: {Math.round(data.main.feels_like)}°</span>
                            </div>
                        </div>
                        <div className='time-container'>
                            <span className='card-time'>{handleDate(data.timezone)}</span>
                        </div>
                    </>
            }
        </div>
    )
}