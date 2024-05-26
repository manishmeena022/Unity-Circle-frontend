import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/features/auth/authSlice';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth)

    const handleLogin = async (e) => {
        e.preventDefault()
        if (email === '' || password === '') {
            toast('Please fill all the fields')
            return
        }
        dispatch(login({ email, password })).then(({ meta, payload }) => {
            if (meta.requestStatus === 'fulfilled') {
                navigate('/profile')
            }
        });
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h2 className="text-center text-3xl font-semibold mb-8">Login</h2>
                <div className="flex justify-center space-x-4 mb-8">
                    <button className="h-12 w-12 bg-blue-600 rounded-full text-white flex items-center justify-center hover:bg-blue-700">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </button>
                    <button className="h-12 w-12 bg-red-600 rounded-full text-white flex items-center justify-center hover:bg-red-700">
                        <FontAwesomeIcon icon={faGoogle} />
                    </button>
                    <button className="h-12 w-12 bg-sky-600 rounded-full text-white flex items-center justify-center hover:bg-sky-700">
                        <FontAwesomeIcon icon={faInstagram} />
                    </button>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="text-sm flex justify-between mt-4">
                    <button className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <Link to="/signup">Sign Up</Link>
                    </button>
                    <button className='mt-4 w-full  py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>Forget Password</button>

                </div>

            </div>
        </div>
    );

}

export default Login