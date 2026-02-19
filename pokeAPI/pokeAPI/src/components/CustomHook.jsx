import { useFetch } from "../hooks/useFetch";
import { useCounter } from "../hooks/useCounter";
import { Loading } from './Loading'
import { Card } from './Card'

export const CustomHook = () => {

    const {counter, decrement, increment} = useCounter(1);
    const {data, hasError, isLoading} = useFetch(`https://dog.ceo/api/breeds/image/random?cache=${counter}`)


    return (
        <>
        <h1>Imagen Random de Perro</h1>
        <hr/>
        <h2>{data?.breed}</h2>
        {isLoading ? <Loading/>
                    :(<Card id={counter} imagen={data.message}/> )
        }
        <br></br>
        <br></br>
        <br></br>

        <button className='btn btn-primary' onClick={()=>increment()} >Siguiente</button>
        </>
    )
}