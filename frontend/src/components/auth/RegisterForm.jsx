import { Card, CardHeader } from '@/components/ui/card'
import { LoaderCircle } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../ui/button'
import { CardContent, CardDescription, CardFooter, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { useMutation } from '@tanstack/react-query'

import api from '../../lib/api/apiClient'

import { extractErrorMessages } from '../../util/errorUtils'


const RegisterForm = () => {

    const navigate = useNavigate();

    // State for form values
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState(null)

    const registerMutation = useMutation({
        mutationFn: async (userData) => {
            const response = await api.post('/auth/register', userData)
            return response.data
        },
        onSuccess: () => {
            navigate('/login')
        },
        onError: (err) => {
            console.log("err", err)
            setError(extractErrorMessages(err))
        }
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (!formValues.name || !formValues.email || !formValues.password) {
            setError('All fields are required')
            return
        }

        if (formValues.password !== formValues.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        registerMutation.mutate({
            name: formValues.name,
            email: formValues.email,
            password: formValues.password
        })
    }

    return (
        <Card className="w-full border-border">
            <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-xl text-center">Create an account</CardTitle>
                <CardDescription className={"text-center"}>
                    Enter your details to register
                </CardDescription>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4 pt-0">
                        {
                            error && (
                                <div className='p-3 bg-destructive/10 text-destructive text-sm rounded-md'>
                                    {error}
                                </div>
                            )
                        }
                        <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>
                                Full Name
                            </div>
                            <Input
                                name="name"
                                placeholder="John Doe"
                                required
                                value={formValues.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>
                                Email
                            </div>
                            <Input name="email"
                                placeholder="email@email.com"
                                required
                                value={formValues.email}
                                onChange={handleInputChange} />
                        </div>
                        <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>
                                Password
                            </div>
                            <Input
                                name="password"
                                type={"password"}
                                placeholder="*****"
                                required

                                value={formValues.password}
                                onChange={handleInputChange} />
                        </div>
                        <div className='space-y-2'>
                            <div className='text-sm font-medium text-left'>
                                Confirm Password
                            </div>
                            <Input
                                name="confirmPassword"
                                type={"password"}
                                placeholder="******"
                                required
                                value={formValues.confirmPassword}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className='py-4'>
                            <Button type="submit" className={"w-full cursor-pointer"}>
                                {registerMutation.isPending ? (<span className='flex items-center gap-2'><LoaderCircle /> Creating account... </span>) : ("Create Account")}
                            </Button>
                        </div>
                    </CardContent>

                    <CardFooter className={"flex justify-center pt-0"}>
                        <div className='text-center text-sm'>
                            Already have an  account ? <a onClick={() => navigate('/login')} className='text-primary hover:underline cursor-pointer'> Sign in</a>
                        </div>
                    </CardFooter>
                </form>
            </CardHeader>
        </Card>
    )
}

export default RegisterForm