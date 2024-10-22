// src/pages/Login.jsx
import { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebaseConfig.js';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirigir a Home
    } catch (error) {
      setError('Error during login: ' + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/'); // Redirigir a Home
    } catch (error) {
      setError('Error during Google login: ' + error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Login</h1>
      <form onSubmit={handleEmailLogin}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login with Email</button>
      </form>
      <div style={{ margin: '20px' }}>or</div>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <Link to="/register">Register with email</Link>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export {Login};
