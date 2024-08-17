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
import { MdOutlineSupportAgent } from "react-icons/md";
import axiosInstance from '../../../../../interceptor/axiosInstance';
import { toast } from 'react-toastify';

const SellSupport = ({ productInfo }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        setIsLoading(true); 

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
            setIsLoading(false); 
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="jump" className="flex items-center gap-2">
                    <MdOutlineSupportAgent size={27} className="text-red-500" />
                  <p className='hover:text-blue-500'>Seller Support</p>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md bg-white p-6">
                <DialogHeader>
                    <DialogTitle className="mb-5">Seller Support</DialogTitle>
                    <DialogDescription
                        className="mt-5"
                    >
                        The products with available support will receive support from the seller for a period of up to 3 months after the purchase.

                        The buyer can ask for support by visiting their “Purchase History” and using the function “Ask for Support”.

                        The seller will have to provide support within a considerable timeframe.

                        The following activities are included within the standard support:
                        <ol className="list-disc pl-5 mt-5 mb-5">
                            <li>Direct responses from the seller regarding technical questions.</li>
                            <li>Source code updates regarding reported bugs.</li>
                            <li>Guidance from the seller regarding the source code functionalities or information not included in the User Guide.</li>
                        </ol>
                        Customization, installation, or support for third-party sources are not included with the standard support.
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

export default SellSupport;
