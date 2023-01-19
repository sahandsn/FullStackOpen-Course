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

const deleteObj = (obj) => {
    // console.log(obj);
    const confirmation = new Promise((resolve, reject)=>{
        if(window.confirm(`Delete ${obj.name}?`)){
            resolve()
        }else{
            reject()
        }
    })
    
    // if promise fulfilled retrun the id of the deleted obj
    return confirmation
            .then(()=>axios.delete(`${baseurl}/${obj.id}`))
            .then(()=>Number(obj.id))
            .catch((err)=>Promise.reject(err) )

    
}

const partialUpdate = (id, obj) => {
    // console.log(obj);
    return axios
            .patch(`${baseurl}/${id}`, obj)
}

const Export = {getAll, createNew, deleteObj, partialUpdate}
export default Export