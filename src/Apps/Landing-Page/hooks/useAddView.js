export const useAddView = () => {

    const addView = (id, views) => {
        views++

        fetch(`http://localhost:5000/posts/${id}`, {
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