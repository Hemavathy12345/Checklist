"use client"
import '@/styles/login.css'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Login = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Check if user is already logged in
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            router.push('/');
        }
    }, [router]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async () => {
        setError('');
        setLoading(true);

        // Validation
        if (!formData.email || !formData.password) {
            setError('Email and password are required');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Login successful - store user data in localStorage or session
            localStorage.setItem('user', JSON.stringify(data.user));
            router.push('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = () => {
        router.push('/signup.js');
    };

    return (
        <div className="login">
            <div className='form'>
                <h2>Welcome Back</h2>
                {error && <div className="error-message">{error}</div>}
                <input 
                    type="email" 
                    name="email"
                    placeholder='Email' 
                    value={formData.email} 
                    onChange={handleInputChange} 
                />
                <input 
                    type="password" 
                    name="password"
                    placeholder='Password' 
                    value={formData.password} 
                    onChange={handleInputChange} 
                />
                <button 
                    type="button" 
                    onClick={handleLogin} 
                    className='button'
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <p className="signup-link">
                    Don't have an account? <span onClick={handleSignup}>Sign up here</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
