import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

export const getOne = async (id) => {
    const res = await axios.get(`${baseUrl}/${id}`)
    return res.data
}

export const createNew = async (content) => {
    const obj = {content, votes: 0}
    const res = await axios.post(baseUrl, obj)
    return res.data
}

export const update = async objectToUpdate => {
    const response = await axios.put(`${baseUrl}/${objectToUpdate.id}`, objectToUpdate)
    return response.data
}