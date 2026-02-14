import LoginPage from './Components/Login';
import ChatPage from './Components/PageWithChat';
import NotFoundPage from './Components/NotFound';
import RegistrationPage from './Components/Registration.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import hasToken from '../src/utils/hasToken.js';

const LoginOrChatPage = () => {
  return (
    !hasToken() ? <Navigate to="login" /> : <ChatPage />
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginOrChatPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="signup" element={<RegistrationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
