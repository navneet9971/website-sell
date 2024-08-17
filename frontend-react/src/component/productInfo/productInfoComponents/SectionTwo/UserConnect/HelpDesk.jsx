import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../../ui/Popup";
import { Button } from "../../../../ui/button";
import { FaHandshake } from "react-icons/fa";
import axiosInstance from '../../../../../interceptor/axiosInstance';
import { toast } from 'react-toastify';

const HelpDesk = ( {productInfo } ) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        setIsLoading(true); // Show loading screen

        const data = {
            userName: productInfo?.userData?.userName || '',
            email: productInfo?.userData?.email || '',
            message: `${productInfo?.userData?.userName || ''} needs a code sample for ${productInfo.productTitle || 'the product'}, User Email: ${productInfo?.userData?.email}`
        };

        try {
            const response = await axiosInstance.post('/api/request-code-simple', data);
            console.log("Response:", response.data);
            toast.success('Code sample request sent successfully!');
        } catch (error) {
            console.error("Error:", error);
            toast.error('Failed to send code sample request.');
        } finally {
            setIsLoading(false); // Hide loading screen
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
            <Button variant="jump">
            <FaHandshake size={20} />
            Help Desk
          </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md bg-white p-6">
                <DialogHeader>
                    <DialogTitle> Help Desk</DialogTitle>
                    <DialogDescription>
                        Our Customer Service Connect in 3 hours after you clicking the send button.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex gap-4 mt-4">
                    <Button variant="outline" onClick={handleSend} disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default HelpDesk