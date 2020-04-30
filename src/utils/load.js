import api from '../service/api'

export async function loadUsers(){
 
  const {data} = await api.get('users')
  localStorage.setItem('users', JSON.stringify(data))

}

export async function loadProfiles(){
 
  const {data} = await api.get('profiles')
  localStorage.setItem('profiles', JSON.stringify(data))
  
}

