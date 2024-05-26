import { faFacebookF, faGoogle, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../../redux/features/auth/authSlice';


const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (data) => {
        if (data.password !== data.confirmPassword) {
            alert('Password and Confirm Password should be same')
            return
        }

        dispatch(userRegister({
            username: data.username,
            fullName: data.fullName,
            email: data.email,
            password: data.password,
            phone: data.phone,
            gender: data.gender,
            // profilePicture: data.profilePicture[0],
        })).then(({ meta, payload }) => {
            if (meta.requestStatus === 'fulfilled') {
                navigate('/login')
                //navigate('/profile')
            }
        })

    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setValue('profilePicture', e.target.files); // Set the file in the form
        }
    };



    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <div className='bg-white shadow-md rounded-lg p-8 max-w-md w-full'>
                <h2 className='h-12 text-blue-500'>
                    Already have an account? <Link to='/login' className='text-blue-500'>Login</Link>
                </h2>
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
                <h2 className='text-center text-3xl font-bold mb-8'>Sign Up</h2>
                <div className='space-y-6'>
                    <form onSubmit={handleSubmit(handleSignup)} className='space-y-2'>
                        <label htmlFor='username' className='block text-sm font-medium text-gray-700'>Username</label>
                        <input type='text' id='username' placeholder='UserName' {...register('username', { required: true })} className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                        {errors.username && <span className='text-red-500'>UserName is required</span>}

                        <label htmlFor='fullname' className='block text-sm font-medium text-gray-700'>Full Name</label>
                        <input type='text' id='fullname' placeholder='Full Name' {...register('fullName', { required: true })} className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                        {errors.fullName && <span className='text-red-500'>Full Name is required</span>}

                        <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture</label>
                        <input type="file" id="profilePicture" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        {errors.profilePicture && <span className="text-red-500">Profile Picture is required</span>}
                        {preview && <img src={preview} alt="Profile Preview" className="mt-2 h-20 w-20 object-cover rounded-full" />}

                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                        <input type='email' id='email' placeholder='Email' {...register('email', { required: true })} className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                        {errors.email && <span className='text-red-500'>Email is required</span>}

                        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                        <input type='password' id='password' placeholder='Password' {...register('password', { required: true })} className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                        {errors.password && <span className='text-red-500'>Password is required</span>}

                        <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>Confirm Password</label>
                        <input type='password' id='confirmPassword' placeholder='Confirm Password' {...register('confirmPassword', { required: true })} className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                        {errors.confirmPassword && <span className='text-red-500'>Confirm Password is required</span>}

                        <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>Phone</label>
                        <input type='number' id='phone' placeholder='Phone' {...register('phone', { required: true })} className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                        {errors.phone && <span className='text-red-500'>Phone is required</span>}

                        <label htmlFor='gender' className='block text-sm font-medium text-gray-700'>Gender</label>
                        <select id='gender' {...register('gender', { required: true })} className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
                            <option value='male' className='text-gray-500'>Male</option>
                            <option value='female' className='text-gray-500'>Female</option>
                            <option value='other' className='text-gray-500'>Other</option>
                        </select>

                        <button type="submit" disabled={loading} className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp