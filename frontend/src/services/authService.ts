import axios from 'axios'
const baseURL = '/api/auth'

async function login(username: string, password: string) {
    const user = await axios.post(`${baseURL}/login`, {
        username,
        password
    })
    return user.data
}

async function register(username: string, password: string) {
    await axios.post(`${baseURL}/register`, {
        username,
        password
    })
}

export default {
    login,
    register
}