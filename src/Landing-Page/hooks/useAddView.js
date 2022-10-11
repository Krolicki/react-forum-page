import { useOutletContext } from 'react-router-dom'

export const useAddView = () => {
    const uid = useOutletContext()

    const addView = (id, views) => {
        views++

        fetch(`https://react-workshop-eba4b-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json?auth=${uid}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                views
            })
        })
        .then(respsonse => {
            if(respsonse.ok){
                return respsonse
            }
            throw respsonse
        })
        .catch(err => {
            console.log(err)
        })
        
        }
        return {addView}
    
}