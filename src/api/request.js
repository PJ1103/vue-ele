import axios from 'axios'

export default function request(url, params = {}, method = 'get') {
  method === 'get' ? params = { params } : ''
  return new Promise((resolve, reject) => {
    axios[method](url, params)
      .then((data) => {
        resolve(data.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
