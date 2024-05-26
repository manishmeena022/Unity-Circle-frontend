import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const url = process.env.REACT_APP_BACKEND_URL;
const Profile = () => {
    const [profile, setProfile] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        fetchProfile()
    },[])

    const fetchProfile = async () => {
        try {
            const response = await fetch(`${url}/users/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('accessToken', 'refreshToken'),
                },
            })

            if (!response.ok) {
                toast.error('Something went wrong')
                return
            }

            const data = await response.json()
            console.log('data', data)
            setProfile(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        toast.success('Logged out successfully')
        navigate('/login');
    }

    const handelChangePassword = () => {}


    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <div className='bg-white shadow-md rounded-lg p-8 max-w-md w-full'>
                <h2 className='text-center text-3xl font-bold mb-6'>Profile</h2>
                <div className='flex flex-row p-2'>
                    <p className='text-lg font-bold'>Username :</p>
                    <p className='text-lg text-gray-800'>{profile.username}</p>
                </div>
                <div className='flex flex-row p-2'>
                    <p className='text-lg font-bold'>Email :</p>
                    <p className='text-lg text-gray-800'>&nbsp; {profile.email}</p>
                </div>
                <div className='flex flex-row p-2'>
                    <p className='text-lg font-bold'>Full Name :</p>
                    <p className='text-lg text-gray-800'>&nbsp; {profile.fullName}</p>
                </div>
                <div className='flex flex-row p-2'>
                    <p className='text-lg font-semibold'>Gender : </p>
                    <p className='text-lg text-gray-800'>&nbsp; {profile.gender}</p>
                </div>
                <div className='flex flex-row p-2'>
                    <p className='text-lg font-semibold'>Phone Number :</p>
                    <p className='text-lg text-gray-800'>&nbsp; {profile.phone}</p>
                </div>
            </div>
            <div className='mt-8'>
                <button onClick={handelChangePassword} className='bg-blue-500 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'>
                    Change Password
                </button>
                <button onClick={handleLogout} className='bg-red-500 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400'>
                    Logout
                </button>
            </div>
        </div>
    );
    
}

export default Profile