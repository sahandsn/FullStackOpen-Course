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


const Export = {getAll, createNew}
export default Export