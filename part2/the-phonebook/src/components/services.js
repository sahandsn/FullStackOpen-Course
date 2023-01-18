import axios from "axios"

const baseurl = 'http://localhost:3001/persons'

const getAll = () => {
    // console.log("promise pending ...");
    return axios
            .get(baseurl)
            // instead of the below, use destructive parameter
            // .then(response => {
            //     // console.log("promise resolved/rejected");
            //     return response.data
            // })
}

const createNew = (obj) => {
    // console.log('creating');
    return axios.post(baseurl, obj)
}

const deleteObj = (id) => {
    const confirmation = new Promise((resolve, reject)=>{
        if(window.confirm('delete?')){
            resolve()
        }else{
            reject()
        }
    })
    // console.log(`${baseurl}/${id}`);
    // if promise fulfilled retrun the id of the deleted obj
    return confirmation
            .then(()=>axios.delete(`${baseurl}/${id}`))
            .then(()=>id, (err) =>{
                // console.log(err);
                if(err!==undefined){
                    alert(err.response.statusText)
                }
                return -1
            })

    
}

const Export = {getAll, createNew, deleteObj}
export default Export