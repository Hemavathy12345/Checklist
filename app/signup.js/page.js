"use client"
import '@/styles/signup.css'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Signup = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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

    const handleSignup = async () => {
        setError('');
        setLoading(true);

        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Signup failed');
            }

            alert('Account created successfully! Please login.');
            router.push('/login');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = () => {
        router.push('/login');
    };

    return (
        <div className="signup">
            <div className='form'>
                <h2>Create Account</h2>
                {error && <div className="error-message">{error}</div>}
                <input 
                    type="text" 
                    name="username"
                    placeholder='Username' 
                    value={formData.username} 
                    onChange={handleInputChange} 
                />
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
                <input 
                    type="password" 
                    name="confirmPassword"
                    placeholder='Confirm Password' 
                    value={formData.confirmPassword} 
                    onChange={handleInputChange} 
                />
                <button 
                    type="button" 
                    onClick={handleSignup} 
                    className='button'
                    disabled={loading}
                >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
                <p className="login-link">
                    Already have an account? <span onClick={handleLogin}>Login here</span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
