import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register, saveToken } from '@/services/auth'

function RegisterPage(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await register(formData)
            saveToken(res.token)
            navigate('/dashboard')
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return(
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-md p-8">

                <div className='mb-8'>
                    <h1 className='text-2xl font-semibold text-gray-800'>Create Account</h1>
                    <p className='text-gray-500 text-sm mt-1'>Start Tracking you finances daily</p>
                </div>


                {error && (
                    <div className='mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Full Name
                        </label>
                        <input 
                            type="text" 
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='John Malik'
                            required
                            className='w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="something@email.com"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
                    >
                        {loading ? 'Creating account...' : 'Create account'}
                    </button>

                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline font-medium">
                        Sign in
                    </Link>
                </p>

            </div>

        </div>
    )

}

export default RegisterPage;