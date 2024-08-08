import React from 'react';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

export function SigningPage({ handleSubmit, formData, handleChange, handleSignUP }) {

    return (
        <div className='flex items-center justify-center '>
            <div className=" p-8 rounded  mt-20 border border-solid  shadow-lg shadow-gray-400" >
                <form
                    className='flex w-[25rem] flex-col gap-5'
                    onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Your email" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            placeholder="name@flowbite.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Your password" />
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
                        <Label htmlFor="remember">Remember me</Label>
                    </div>
                    <Button type="submit">Submit</Button>
                </form>

                <p className='mt-6' >Don't have an account?
                    <span
                        className='ml-1 text-blue-600 font-bold cursor-pointer hover:text-blue-400'
                        onClick={handleSignUP}
                    >
                        SignUp
                    </span>
                </p>

            </div>
        </div>
    );
}
