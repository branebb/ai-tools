import toast from "react-hot-toast"
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const DeleteButton = ({ id, onTopicDeleted }: any) => {
    const deleteTopic = async () => {
        const confirmed = confirm("Jesi siguran?");

        if (confirmed) {
            const res = await fetch(`http://localhost:3000/api/saved?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                onTopicDeleted(id); // Call the function to update the state in the parent component
                toast.success("Topic deleted successfully!");
            }
        }
    };

    return <Button onClick={deleteTopic}>Delete</Button>;
};

export default DeleteButton;