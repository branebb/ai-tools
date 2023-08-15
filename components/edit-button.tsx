import React, { useState } from 'react';
import { Button } from './ui/button';
import { toast } from 'react-hot-toast';

const EditButton = ({ id, initialTitle, onTitleChange }: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(initialTitle);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTitle(event.target.value);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedTitle(initialTitle); 
    };

    const handleSaveClick = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/saved?id=${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ id, title: editedTitle }),
            });

            if (res.ok) {
                onTitleChange(editedTitle);
                setIsEditing(false);
                toast.success('Naslov uspješno ažuriran!');
            }
        } catch (error) {
            toast.error('Greška pri ažuriranju naslova!');
        }
    };

    return (
        <div>
            {isEditing ? (
                <div className='w-full max-w-screen-lg mx-auto px-4'>
                    <input className='border-2 border-[#25242] rounded-lg '
                        type="text"
                        value={editedTitle}
                        onChange={handleTitleChange}
                    />
                    <div className='flex mt-4 gap-x-4 justify-center'>
                        <Button variant="outline" className="group rounded-full bg-[#0047BB] text-[#CED9E5] hover:text-[#252422]" onClick={handleSaveClick}>Save</Button>
                        <Button variant="outline" className="group rounded-full bg-[#0047BB] text-[#CED9E5] hover:text-[#252422]" onClick={handleCancelClick}>Cancel</Button>
                    </div>
                </div>
            ) :
                (
                    <Button variant="outline" className="group rounded-full bg-[#0047BB] text-[#CED9E5] hover:text-[#252422] w-full" onClick={handleEditClick}>Edit</Button>
                )}
        </div>
    );
};

export default EditButton;
