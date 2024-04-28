import './card.css'
import backgroundImage from '../sunnyday.jpg'


export default function Card({loading, data, setCity}) {

    //console.log(date)


    const handleDate = (timezone) => {
        const horaActualUTC = new Date();
        horaActualUTC.setUTCHours(horaActualUTC.getUTCHours() + (timezone/3600));
        return horaActualUTC.toUTCString();
      }


    return (
        <div className="card-container">
            {
                loading ? <span>Cargando</span> :
                    data.length < 0 ? <span>No se encontro contenido</span> : 
                    <>
                        {/* <div className="card-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }}> */}
                        {/* <img className="card-image" src="/Weather-app-using-openweatherapi-React-HTML-CSS/static/media/daycard.d60cce916241fbd70e89.jpg" alt="" /> */}
                        <span className='card-location'>{data.name}</span>
                        <select id="opciones" name="opciones" onClick={(event) => setCity(event.target.value)}>
                            <option value='Buenos Aires'>Argentina</option>
                            <option value='Bogota'>Colombia</option>
                            <option value='Moscu'>Rusia</option>
                        </select>
                        <div className='body-container'>
                            <div className='temperature-container'>
                                <span>Icono</span>
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