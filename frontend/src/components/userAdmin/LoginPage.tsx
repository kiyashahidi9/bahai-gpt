import { useState, type SyntheticEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/AuthProvider'
import authService from '../../services/authService'

function LoginPage() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const from = (location.state)?.from?.pathname || '/chats/new'

    async function onLoginSubmit( event: SyntheticEvent) {
        event.preventDefault()
        setError('')

        try {
            const user = await authService.login(username, password)

            auth.login(user.token, user.user)
            navigate(from, { replace:true })
        } catch (error) {
            setError("Invalid username and/or password, try again :)")
            setUsername('')
            setPassword('')
            console.error(error)
        }
    }

    return (
        <div className="auth-page">
            <h1>
                Welcome to BahaiGPT :D
            </h1>
            <div className="form-body">
                <h3>
                    Please log in, old friend!
                </h3>
                {error && <p className='form-error'>{error}</p>}
                <form onSubmit={onLoginSubmit} className="form-card">
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
                    <button className="form-button" type="submit">Log In</button>
                </form>
                <p>
                    Don't have an account? <Link to="/register">Register here!</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage