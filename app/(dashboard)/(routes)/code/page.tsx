"use client";

import * as z from "zod";
import axios from "axios";

import ReactMarkdown from "react-markdown";
import SaveButton from "@/components/save-button";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Heading } from "@/components/heading";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { Code2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";


const CodePage = () => {

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
            const response = await axios.post("/api/code", {
                messages: newMessages,
            });

            setMessages((current) => [...current, userMessage, response.data]);

            form.reset();

        } catch (error: any) {
            toast.error("Dogodila se greška. Pokušaj ponovo!");
        } finally {
            router.refresh();
        }
    };

    return (
        <div className="px-2">
            <Heading tittle="Generiranje koda" description="Opiši kakav problem imaš ili koji dio koda ti je potreban!" icon={Code2}
                iconColor="text-[#F7C4A5]" bgColor="bg-[#0047BB]" />
            <div className="px-4 lg:px-8 bg-[#CED9E5]">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 bg-white">
                            <FormField name="prompt" render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading} placeholder="Double for loops for 2D matrix input" {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                            <Button className="rounded-full col-span-12 lg:col-span-2 w-full bg-[#0047BB] text-[#CED9E5] hover:bg-[#0047BB] text-md" disabled={isLoading}>
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
                        <Empty label="Trenutno nema nikakvog koda generiranog. Postavi pitanje!" />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.slice().reverse().map((message) => (
                            <div key={message.content}
                                className={cn("p-8 w-full flex items-start gap-x-2 rounded-lg",
                                    message.role == "user" ? "bg-white border border-black/10" : "bg-white")}>
                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                <ReactMarkdown components={{
                                    pre: ({ node, ...props }) => (
                                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                            <pre {...props} />
                                        </div>
                                    ),
                                    code: ({ node, ...props }) => (
                                        <code className="bg-black/10 rounded-lg p-1" {...props}></code>
                                    )
                                }}
                                    className="text-sm overflow-hidden leading-7">
                                    {message.content || ""}
                                </ReactMarkdown>
                                {message.role !== "user" && <SaveButton dataschema={{ title: promptToSave, prompt: promptToSave, answer: message.content, type: "Code" }} />}
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodePage;