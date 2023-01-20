import React from 'react'
import { Link } from 'react-router-dom';
import { Login } from '../components/auth/Login';

export const LoginPage = () => {
  return (
    <div>
        <h1>LoginPage</h1>
        <Login />
        <p>
            Or <Link to={'/register'}>register</Link>
        </p>
    </div>
  )
}
