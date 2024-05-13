import './card.css'
import icon01d from '../assest/icons/01d.svg'
import icon02d from '../assest/icons/02d.png'
import icon03d from '../assest/icons/03d.svg'
import icon04d from '../assest/icons/04d.png'
import icon09d from '../assest/icons/09d.png'
import icon10d from '../assest/icons/10d.svg'
import icon11d from '../assest/icons/11d.svg'
import icon13d from '../assest/icons/13d.svg'
import icon50d from '../assest/icons/50d.svg'
import icon01n from '../assest/icons/01n.svg'
import icon02n from '../assest/icons/02n.png'
import icon10n from '../assest/icons/10n.png'
import humidity from '../assest/icons/humidity.svg'
import refresh from '../assest/icons/refresh.svg'
import arrow from '../assest/icons/arrow.svg'
import { useState } from 'react'



export default function Card({ time, city, refreshing, loading, data, setCity, setRefresh }) {

    const [showOptions, setShowOptions] = useState(false)

    //Función que recibe el horario de la API y la parsea a un formato para poder ser mostrada en la card. 
    const handleDate = (timezone) => {
        const horaActualUTC = new Date();
        horaActualUTC.setUTCHours(horaActualUTC.getUTCHours() + (timezone / 3600));
        let horario = horaActualUTC.toUTCString();
        let indiceDosPuntos = horario.lastIndexOf(":");
        let fechaSinSegundos = horario.substring(0, indiceDosPuntos);
        return fechaSinSegundos;
    }

    //Aquí se realiza la lógica para que dependiendo de lo que devuelva la API se decidirá que icono se verá en la card.
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

    const options = [
        { value: 'Buenos Aires', label: 'Argentina' },
        { value: 'Berlin', label: 'Alemania' },
        { value: 'Bogota', label: 'Colombia' },
        { value: 'Madrid', label: 'España' },
        { value: 'Paris', label: 'Francia' },
        { value: 'Moscu', label: 'Rusia' },
        { value: 'Londres', label: 'Inglaterra' },
        { value: 'Tokio', label: 'Japon' },
    ];

    //Mostramos la card, si el fetcher aún no termino se exhibirá un loader y en caso de que allá un error o que la API devuelva data vacía se mostrara un mensaje.
    //La propiedad time utilizada en las classNames card-container y select-options son para cambiar los estilos de la card dependiendo el horario de la ciudad que se seleccionó.     
    return (
        <div className={`card-container ${time}`}>
            {
                loading ? <div className='loader-container'><span className='loader'></span></div> :
                    data === "empty" ? <div className='loader-container'><span className='no-data'>No se encontró contenido</span></div> :
                        <>
                            <div className='card-subcontainer'>
                                <div className='card-countrys'>
                                    <div className='card-select'>
                                        <div className="select-selected" onClick={() => setShowOptions(!showOptions)}>
                                            <span>{city.label}</span>
                                            <img src={arrow} className={!showOptions ? 'arrow-icon' : 'arrow-icon rotate'} />
                                        </div>
                                        {showOptions && (
                                            <>
                                                <div
                                                    className="modal-backdrop"
                                                    onClick={() => setShowOptions(!showOptions)}
                                                ></div>
                                                <div className={`select-options ${time}`}>
                                                    {options.map((option, index) => (
                                                        <div
                                                            key={index}
                                                            className='select-option'
                                                            onClick={() => { setCity(option); setShowOptions(!showOptions) }}
                                                            onClose={() => setShowOptions(false)}
                                                        >
                                                            {option.label}
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <img src={refresh} onClick={() => setRefresh(prevState => !prevState)} className={!refreshing ? 'refresh-icon' : 'refresh-icon rotate-refresh'} />
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
                            <div className='data-container'>
                                <div>
                                    <span>Max: {Math.round(data.main.temp_max)}°</span>
                                </div>
                                <div>
                                    <span>Min: {Math.round(data.main.temp_min)}°</span>
                                </div>
                                <div className='wind-container'>
                                    <img className='wind-icon' src={humidity} alt="Viento Actual" />
                                    <span>{data.main.humidity} %</span>
                                </div>
                                <div className='humidity-cotainer'>
                                    <img className='wind-icon' src={icon50d} alt="Humedad Actual" />
                                    <span>{Math.round(data.wind.speed * 3.6)} Km/h</span>
                                </div>
                            </div>
                            <div className='time-container'>
                                <span className='card-time'>{handleDate(data.timezone)} hs</span>
                            </div>
                        </>
            }
        </div>
    )
}