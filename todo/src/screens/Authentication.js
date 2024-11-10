import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useUser } from '../context/useUser.js';

export const AuthenticationMode = Object.freeze({
  Login: 'Login',
  Register: 'Register'
});

export default function Authentication({ authenticationMode }) {
  const { user, setUser, signUp, signIn } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (authenticationMode === AuthenticationMode.Register) {
        await signUp();
        navigate('/signin');
      } else {
        await signIn();
        navigate("/");
      }
    } catch (error) {
      const message = error.response && error.response.data ? error.response.data.error : error;
      alert(message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">
            {authenticationMode === AuthenticationMode.Login ? 'Sign In' : 'Sign Up'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <button className="btn btn-primary w-100" type="submit">
              {authenticationMode === AuthenticationMode.Login ? 'Login' : 'Register'}
            </button>
          </form>
          <div className="mt-3 text-center">
            <Link to={authenticationMode === AuthenticationMode.Login ? '/signup' : '/signin'}>
              {authenticationMode === AuthenticationMode.Login
                ? 'No account? Sign up'
                : 'Already have an account? Sign in'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
