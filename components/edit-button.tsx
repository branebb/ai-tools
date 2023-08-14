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
                toast.success('Title changed successfuly!');
            }
        } catch (error) {
            toast.error('Error updating title!');
        }
    };

    return (
        <div>
            {isEditing ? (
                <div className='w-full max-w-screen-lg mx-auto px-4'>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={handleTitleChange}
                    />
                    <div className='flex mt-4 gap-x-4 justify-center'>
                        <Button onClick={handleSaveClick}>Save</Button>
                        <Button onClick={handleCancelClick}>Cancel</Button>
                    </div>
                </div>
            ) :
                (
                    <Button className='w-full' onClick={handleEditClick}>Edit</Button>
                )}
        </div>
    );
};

export default EditButton;
