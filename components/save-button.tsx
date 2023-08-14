import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "./ui/button";

const SaveButton = ({ dataschema }: any) => {
    const [buttonText, setButtonText] = useState("Save"); // Initial button text is "Save"

    const saveTopic = async () => {
        const { title, type, prompt, answer } = dataschema;
        const data = { title, type, prompt, answer };

        const res = await fetch("http://localhost:3000/api/saved", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            setButtonText("Saved");
            toast.success("Document saved successfully!");
        } else {
            toast.error("Failed to save document!");
        }
    };

    return (
        <Button onClick={saveTopic} disabled={buttonText === "Saved"}>
            {buttonText}
        </Button>
    );
}

export default SaveButton;
