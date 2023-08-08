"use client";


import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("7620a777-5082-43f2-b617-27997f6ecb53")
    }, []);

    return null;
}