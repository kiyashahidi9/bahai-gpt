import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './components/userAdmin/LoginPage'
import RegisterPage from './components/userAdmin/RegisterPage'
import './App.css'
import MainPage from './components/conversations/Conversations'
import RequireAuth from './auth/RequireAuth'
import Chats from './components/chats/Chats'
import InfoPage from './components/info/InfoPage'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Navigate to="/chats/new"/>} />
        <Route path="/chats" element={<RequireAuth><MainPage /></RequireAuth>}>
          <Route path="new" element={<RequireAuth><Chats /></RequireAuth>} />
          <Route path="info" element={<RequireAuth><InfoPage /></RequireAuth>} />
          <Route path=":conversationId" element={<RequireAuth><Chats /></RequireAuth>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
