import React, { useState } from 'react';
import { Button } from './ui/button';
import { toast } from 'react-hot-toast';

const DeleteButton = ({ id, onTopicDeleted }: any) => {
    const [isConfirming, setIsConfirming] = useState(false);

    const handleDeleteClick = async () => {
        if (isConfirming) {
            const res = await fetch(`http://localhost:3000/saved?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                onTopicDeleted(id);
                toast.success("Uspješno obrisana stavka!");
            }
        } else {
            setIsConfirming(true);
        }
    };

    const handleCancelClick = () => {
        setIsConfirming(false);
    };

    return (
        <div>
            {isConfirming ? (
                <div className='flex mt-4 gap-x-4 justify-center'>
                    <Button
                        variant="outline"
                        className="group rounded-full bg-[#0047BB] text-[#CED9E5] hover:text-[#252422]"
                        onClick={handleDeleteClick}
                    >
                        Confirm
                    </Button>
                    <Button
                        variant="outline"
                        className="group rounded-full bg-[#0047BB] text-[#CED9E5] hover:text-[#252422]"
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </Button>
                </div>
            ) : (
                <Button
                    variant="outline"
                    className="w-full group rounded-full bg-[#0047BB] text-[#CED9E5] hover:text-[#252422]"
                    onClick={handleDeleteClick}
                >
                    Delete
                </Button>
            )}
        </div>
    );
};

export default DeleteButton;
