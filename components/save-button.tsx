import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "./ui/button";

const SaveButton = ({ dataschema }: any) => {
    const [buttonText, setButtonText] = useState("Spremi");

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
            setButtonText("Spremljeno");
            toast.success("Uspješno spremanje!");
        } else {
            toast.error("Greška pri spremanju!");
        }
    };

    return (
        <Button className="group rounded-full bg-[#0047BB] text-[#CED9E5] hover:bg-[#0047BB]" onClick={saveTopic} disabled={buttonText === "Saved"} >
            {buttonText}
        </Button>
    );
}

export default SaveButton;
