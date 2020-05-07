import axios from 'axios'

const hostname = () => {
  const app = window.location.hostname 
  if(app === '3000-b1fb3da5-de03-4e7b-a5ce-cd8d56453343.ws-us02.gitpod.io')
    return 'https://8000-b9d5fcf3-bc62-4975-8503-3f846f8906ae.ws-us02.gitpod.io'
  if(app === '10.20.0.22')
    return 'http://10.20.2.22:8000'
  
  if(app === 'localhost')
    return 'http://localhost:8000' 
  
  if(app === 'enturmacao-teste.netlify.com')
    return 'https://enturmacao.detec.site'
  
  if(app === 'enturmacao-azure.netlify.com')
     return 'https://enturmacao-api.azurewebsites.net'
  //https://comeve.netlify.com/
  return 'http://10.20.0.22:8000'
}

const api = axios.create({
  baseURL: hostname(),
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
})
//console.log('23:38')
console.log(hostname())
export default api