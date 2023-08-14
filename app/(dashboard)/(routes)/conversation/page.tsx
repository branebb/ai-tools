"use client";

import * as z from "zod";
import axios from "axios";

import { Heading } from "@/components/heading";
import { MessageSquare, MessagesSquare } from "lucide-react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { toast } from "react-hot-toast";
import SaveButton from "@/components/save-button";

const Conversation = () => {

    const [promptToSave, setPromptToSave] = useState("");

    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            setPromptToSave(values.prompt);

            const userMessage: ChatCompletionRequestMessage = {
                role: "user",
                content: values.prompt,
            };
            const newMessages = [...messages, userMessage];
            const response = await axios.post("/api/conversation", {
                messages: newMessages,
            });

            setMessages((current) => [...current, userMessage, response.data]);

            form.reset();

        } catch (error: any) {
            toast.error("Oops. Something went wrong. Please try again.");
        } finally {
            router.refresh();
        }
    };

    return (
        <div className="px-10">
            <Heading tittle="Razgovor" description="Postavi bilo koje pitanje!" icon={MessagesSquare}
                iconColor="text-[#EC368D]" bgColor="bg-[#0047BB]" />
            <div className="px-4 lg:px-8 bg-[#CED9E5]">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="bg-white rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                            <FormField name="prompt" render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading} placeholder="Kako se računa prosjek nekih podataka?" {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                            <Button variant="secondary" className=" col-span-12 lg:col-span-2 w-full group rounded-full bg-[#0047BB] text-[#CED9E5] hover:text-[#252422]" disabled={isLoading}>
                                Generiraj
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-white">
                            <Loader />
                        </div>
                    )}
                    {messages.length == 0 && !isLoading && (
                        <Empty label="Trenutno nema pitanja. Postavi pitanje i saznaj odgovor!" />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.slice().reverse().map((message) => (
                            <div key={message.content}
                                className={cn("p-8 w-full flex items-center gap-x-5 rounded-lg",
                                    message.role == "user" ? "bg-white border border-black/10" : "bg-white")}>
                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                
                                <p className="text-md text-justify">
                                    {message.content}
                                </p>
                                {message.role !== "user" && <SaveButton dataschema = {{title: promptToSave, prompt: promptToSave, answer: message.content, type: "Conversation"}} />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Conversation;