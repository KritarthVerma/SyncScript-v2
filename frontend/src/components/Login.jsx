import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios.js';

export default function LoginComponent({switchToSignUp}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
      setError('');

      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }

      try {
        const res = await api.post("/user/login", { email, password });

        if (res.status === 200 && res.data.user) {
          navigate("/editor");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Login failed");
      }
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100%',
      backgroundColor: '#222831',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#393e46',
        padding: '48px',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '400px'
      }}>

        {/*Welcome Back Heading*/}
        <h1 style={{
          color: '#eeeeee',
          fontSize: '32px',
          fontWeight: '700',
          marginBottom: '8px',
          textAlign: 'center'
        }}>
          Welcome Back
        </h1>

        {/*Sign in to continue text*/}
        <p style={{
          color: '#00adb5',
          textAlign: 'center',
          marginBottom: '32px',
          fontSize: '14px'
        }}>
          Sign in to continue
        </p>

        <div>
          {/*Email Input*/}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              color: '#eeeeee',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '8px'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#222831',
                border: '2px solid transparent',
                borderRadius: '8px',
                color: '#eeeeee',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#00adb5'}
              onBlur={(e) => e.target.style.borderColor = 'transparent'}
            />
          </div>

          {/*Password Input*/}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              color: '#eeeeee',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '8px'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#222831',
                border: '2px solid transparent',
                borderRadius: '8px',
                color: '#eeeeee',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#00adb5'}
              onBlur={(e) => e.target.style.borderColor = 'transparent'}
            />
          </div>

          {/*Error Message*/}
          {error && (
            <div style={{
              backgroundColor: 'rgba(220, 38, 38, 0.1)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              color: '#fca5a5',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '24px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          {/*Login Button*/}
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#00adb5',
              color: '#222831',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 12px rgba(0, 173, 181, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#009aa1';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 16px rgba(0, 173, 181, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#00adb5';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 173, 181, 0.3)';
            }}
          >
            Sign In
          </button>
        </div>
        {/*Switch To SignUp*/}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p style={{ color: "#eeeeee", fontSize: "14px" }}>
                Don’t have an account?
                <span
                onClick={switchToSignUp}
                style={{
                    color: "#00adb5",
                    marginLeft: "6px",
                    cursor: "pointer",
                    fontWeight: "600"
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                Create One
                </span>
            </p>
        </div>
      </div>
    </div>
  );
}