import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Currency = () => {
    const {code} = useParams()
    const url = `http://api.nbp.pl/api/exchangerates/rates/a/${code}`
    const [rate, setRate] = useState(null)
    
    useEffect(()=>{
        fetch(url)
            .then((response) => {
                if(response.ok)
                    return response
                throw response
            })
            .then(response => response.json())
            .then(response => setRate(response))
            .catch(()=>{
                console.log("nie działa")
            })
    },[url])

    if(rate){
        return(
            <div>
                <h1>Kurs {code}</h1>
                <p>1 PLN = {rate.rates[0].mid}</p>
                <img src="https://unsplash.it/920/600" alt="some picture"/>
            </div>
        )
    }

    return(
        <div>
            <p>Wczytywanie...</p>
        </div>
    )
}