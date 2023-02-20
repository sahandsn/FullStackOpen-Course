import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

const getAll = async () => {
  const {data} = await axios.get(baseUrl)
  return data
}

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const createOne = async (blog) => {
  // console.log(token);
  const config = { headers: {Authorization: token}}
  const res = await axios.post(baseUrl, blog, config)
  return res.data
}

const updateOne = async (updatedBlog) =>{
  const res = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
  return res.data
}

const deleteOne = async (id) => {
  const config = { headers: {Authorization: token}}
  await axios.delete(`${baseUrl}/${id}`, config)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createOne, setToken, updateOne, deleteOne }