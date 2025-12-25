import React, { use, useState } from 'react';
import api from '../utils/axios';
import {useNavigate} from 'react-router-dom';
import { saveUserSettings } from '../utils/user';

export default function Signup({ switchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async () => {
    setError('');
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await api.post("/user/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (res.status === 201 && res.data.user) {
        saveUserSettings(res.data.user);
        navigate("/editor");
      }

    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Signup failed");
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
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#393e46',
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '400px'
      }}>

        {/*Create Account Heading*/}
        <h1 style={{
          color: '#eeeeee',
          fontSize: '28px',
          fontWeight: '700',
          marginBottom: '6px',
          textAlign: 'center'
        }}>
          Create Account
        </h1>

        {/*Signup Subtitle*/}
        <p style={{
          color: '#00adb5',
          textAlign: 'center',
          marginBottom: '24px',
          fontSize: '13px'
        }}>
          Sign up to get started
        </p>

        <div onKeyPress={handleKeyPress}>

          {/*Name Input*/}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              color: '#eeeeee',
              fontSize: '13px',
              fontWeight: '500',
              marginBottom: '6px'
            }}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              style={{
                width: '100%',
                padding: '10px 14px',
                backgroundColor: '#222831',
                border: '2px solid transparent',
                borderRadius: '8px',
                color: '#eeeeee',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#00adb5'}
              onBlur={(e) => e.target.style.borderColor = 'transparent'}
            />
          </div>

          {/*Email Input*/}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              color: '#eeeeee',
              fontSize: '13px',
              fontWeight: '500',
              marginBottom: '6px'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '10px 14px',
                backgroundColor: '#222831',
                border: '2px solid transparent',
                borderRadius: '8px',
                color: '#eeeeee',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#00adb5'}
              onBlur={(e) => e.target.style.borderColor = 'transparent'}
            />
          </div>

          {/*Password Input*/}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              color: '#eeeeee',
              fontSize: '13px',
              fontWeight: '500',
              marginBottom: '6px'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '10px 14px',
                backgroundColor: '#222831',
                border: '2px solid transparent',
                borderRadius: '8px',
                color: '#eeeeee',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#00adb5'}
              onBlur={(e) => e.target.style.borderColor = 'transparent'}
            />
          </div>

          {/*Confirm Password Input*/}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              color: '#eeeeee',
              fontSize: '13px',
              fontWeight: '500',
              marginBottom: '6px'
            }}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              style={{
                width: '100%',
                padding: '10px 14px',
                backgroundColor: '#222831',
                border: '2px solid transparent',
                borderRadius: '8px',
                color: '#eeeeee',
                fontSize: '15px',
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
              padding: '10px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '13px'
            }}>
              {error}
            </div>
          )}

          {/*Submit Button*/}
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#00adb5',
              color: '#222831',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
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
            Sign Up
          </button>
        </div>

        {/*Switch to Login*/}
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <p style={{ color: '#eeeeee', fontSize: '13px' }}>
            Already have an account?
            <span
              onClick={switchToLogin}
              style={{
                color: '#00adb5',
                marginLeft: '6px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
              onMouseEnter={(e) => (e.target.style.opacity = '0.8')}
              onMouseLeave={(e) => (e.target.style.opacity = '1')}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}