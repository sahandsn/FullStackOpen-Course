import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

export const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}
