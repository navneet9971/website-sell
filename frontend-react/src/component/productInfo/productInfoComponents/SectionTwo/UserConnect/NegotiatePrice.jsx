import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../../ui/Popup";
import { FaHandshake } from "react-icons/fa";
import { Button } from "../../../../ui/button";
import { Input } from '../../../../ui/input';
import { Label } from "../../../../ui/label";
import axiosInstance from '../../../../../interceptor/axiosInstance';
import { toast } from 'react-toastify';

const NegotiatePrice = ({ productInfo }) => {
    const [form, setForm] = useState({
        userName: '',
        email: '',
        negotiatePrice: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (productInfo?.userData) {
            setForm({
                ...form,
                userName: productInfo.userData.userName || '',
                email: productInfo.userData.email || '',
            });
        }
    }, [productInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const handleConfirm = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Show loading screen

        try {
            const response = await axiosInstance.post('/api/negotiation', form);
            console.log("Response:", response.data);
            toast.success('Price negotiation request sent successfully!');
        } catch (error) {
            console.error("Error:", error);
            toast.error('Failed to send price negotiation request.');
        } finally {
            setIsLoading(false); // Hide loading screen
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" className="flex items-center gap-2">
                    <FaHandshake size={20} />
                    <p className='hover:text-blue-500'>Negotiate Price</p>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md bg-white p-6">
                <DialogHeader>
                    <DialogTitle>Negotiate Price</DialogTitle>
                    <DialogDescription>
                        Please fill in the details to negotiate the price.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-4">
                    <div>
                        <Label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </Label>
                        <Input
                            id="username"
                            name="userName"
                            type="text"
                            className="mt-1 block w-full border rounded-md p-2"
                            placeholder="Enter your username"
                            value={form.userName}
                            onChange={handleChange}
                            readOnly
                        />
                    </div>

                    <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            className="mt-1 block w-full border rounded-md p-2"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            readOnly
                        />
                    </div>

                    <div>
                        <Label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Negotiation Price
                        </Label>
                        <Input
                            id="price"
                            name="negotiatePrice"
                            type="number"
                            className="mt-1 block w-full border rounded-md p-2"
                            placeholder="Enter your negotiation price"
                            value={form.negotiatePrice}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label htmlFor="message" className="block text-sm font-medium text-gray-700">
                            What is Your Need
                        </Label>
                        <textarea
                            id="message"
                            name="message"
                            className="mt-1 block w-full border rounded-md p-2"
                            rows="3"
                            placeholder="Describe your needs"
                            value={form.message}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex gap-4 mt-4">
                    <Button
                        variant="outline"
                        onClick={handleConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Send'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default NegotiatePrice;
