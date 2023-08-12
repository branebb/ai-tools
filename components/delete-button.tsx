import toast from "react-hot-toast"
import { Button } from "./ui/button";

const DeleteButton = ({ id }: any) => {

    const deleteTopic = async () => {
        const confirmed = confirm("Jesi siguran?")

        if (confirmed) {
            const res = await fetch(`http://localhost:3000/api/saved?id=${id}`, {
                method: "DELETE",
            });
            
            if (res.ok) 
            {
                window.location.reload();
            }
        }
    };

    return (
            <Button onClick={deleteTopic}>Delete</Button>
    );
}

export default DeleteButton;