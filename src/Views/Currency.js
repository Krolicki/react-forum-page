import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Loading } from "../Components"

export const Currency = () => {
    const {code} = useParams()
    const url = `http://api.nbp.pl/api/exchangerates/rates/a/${code}`
    const [rate, setRate] = useState({
        loading: false,
        data: null,
        error: false
    })
    const [errorMessage, setErrorMessage] = useState(null)
    
    let content = null

    useEffect(()=>{
        setRate({
            loading: true,
            data: null,
            error: false
        })
        fetch(url)
            .then((response) => {
                if(response.ok)
                    return response
                throw response
            })
            .then(response => response.json())
            .then(response => setRate({
                loading: false,
                data: response,
                error: false
            }))
            .catch(err=>{
                setRate({
                    loading: false,
                    data: null,
                    error: true
                })
                setErrorMessage(`Status: ${err.status}`)
            })
    },[url])

    if(rate.error){
        content = <div>
            <p>Błąd podczas pobierania danych</p>
            <p>{errorMessage}</p>
        </div>
    }

    if(rate.loading){
        content= <Loading />
    }

    if(rate.data){
        content = <div>
            <h1>Kurs {code}</h1>
            <p>1 PLN = {rate.data.rates[0].mid}</p>
            <img src="https://unsplash.it/920/600" alt="some picture"/>
        </div>
    }

    return(
        <div>
            {content}
        </div>
    )
}