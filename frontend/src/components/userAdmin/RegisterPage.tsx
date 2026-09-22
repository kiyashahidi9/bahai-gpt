import { useState, type SyntheticEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import authService from '../../services/authService'

function RegisterPage() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmedPassword, setConfirmedPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()

    async function onRegisterSubmit(e: SyntheticEvent) {
        e.preventDefault()
        setError('')

        try {
            if (password !== confirmedPassword) {
                setError('Passwords do not match')
                setConfirmedPassword('')
                return
            }

            await authService.register(username, password)
            navigate('/login')
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                console.log(err.response.data)
                setError(err.response.data.error)
            } else {
                setError("An unexpected error occured. Try again")
            }

            setPassword('')
            setConfirmedPassword('')
        }
    }

    return (
        <div className="auth-page">
            <h1>
                Welcome to BahaiGPT :D
            </h1>
            <div className="form-body">
                <h3>
                    Please register, new friend!
                </h3>
                {error && <p className='form-error'>{error}</p>}
                <form onSubmit={onRegisterSubmit} className="form-card">
                    <div>
                        <label>
                            Username:
                            <input 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="form-input"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password:
                            <input 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type='password'
                                className="form-input"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Confirm Password:
                            <input 
                                value={confirmedPassword}
                                onChange={(e) => setConfirmedPassword(e.target.value)}
                                type='password'
                                className="form-input"
                            />
                        </label>
                    </div>
                    <button type="submit" className="form-button">Create Account</button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Log in here!</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage