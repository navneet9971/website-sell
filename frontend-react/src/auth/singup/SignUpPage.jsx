import React from 'react';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

export function SignupPage({ 
    formData, 
    handleChange, 
    handleSubmit, 
    handleSignIn,
    handleFileChange
}) {
    return (
        <div className='flex items-center justify-center '>
            <div className=" p-8 rounded  mt-4 border border-solid  shadow-lg shadow-gray-400" >
                <form
                    className='flex w-[25rem] flex-col gap-5'
                    onSubmit={handleSubmit}
                >
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="fullName" value="Full Name" />
                        </div>
                        <TextInput
                            id="fullName"
                            type="text"
                            placeholder="John Doe"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="username" value="Username" />
                        </div>
                        <TextInput
                            id="userName"
                            type="text"
                            placeholder="johndoe123"
                            required
                            value={formData.userName}
                            onChange={handleChange}
                        />
                            </div>
<div>
<label className='block text-sm font-medium'>Upload Images of Project</label>
                <input
                  type='file'
                  name='profilePic'
                  onChange={handleFileChange}
                  className='mt-1 block w-full p-2 border rounded-md'
                />
</div>
                
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Password" />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="remember"
                            checked={formData.remember}
                            onChange={handleChange}
                        />
                        <Label htmlFor="remember">
                            Remember me
                        </Label>
                    </div>
                    <Button type="submit">Sign Up</Button>
                </form>


                <p className='mt-6' >Alredy have a account?
                    <span
                        className='ml-1 text-blue-600 font-bold cursor-pointer hover:text-blue-400'
                        onClick={handleSignIn}
                    >
                        Login
                    </span>
                </p>

            </div>
        </div>
    );
}
