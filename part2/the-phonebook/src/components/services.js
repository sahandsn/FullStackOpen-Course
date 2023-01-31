import axios from "axios"

const baseurl = 'http://localhost:3001'
// https://phonebook-production.up.railway.app
// http://localhost:3001

const getAll = () => {
    // console.log("promise pending ...");
    return axios
            .get(`${baseurl}/api/persons`)
            // instead of the below, use destructive parameter
            // .then(response => {
            //     // console.log("promise resolved/rejected");
            //     return response.data
            // })
}

const createNew = (obj) => {
    // console.log('creating');
    return axios.post(`${baseurl}/api/persons`, obj)
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
            .then(()=>axios.delete(`${baseurl}/api/persons/${obj.id}`))
            .then(()=>obj.id)
            .catch((err)=>Promise.reject(err) )

    
}

const personUpdate = (id, obj) => {
    // console.log(obj);
    return axios
            .put(`${baseurl}/api/persons/${id}`, obj)
            // .then(result => result)
            // .catch(err => console.warn(err))
}

const Export = {getAll, createNew, deleteObj, personUpdate}
export default Export