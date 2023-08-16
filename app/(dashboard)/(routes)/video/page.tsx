"use client";

import * as z from "zod";
import axios from "axios";
import { Heading } from "@/components/heading";
import { Clapperboard } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { toast } from "react-hot-toast";

const VideoPage = () => {

    const router = useRouter();
    const [video, setVideo] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setVideo(undefined);
            
            const response = await axios.post("/api/video", values)

            setVideo(response.data[0]);

            form.reset();

        } catch (error: any) {
            toast.error("Dogodila se greška. Pokušaj ponovo!");
        } finally {
            router.refresh();
        }
    };

    return (
        <div className="px-2">
            <Heading tittle="Generiranje videa" description="Opiši kakav video želiš, što bolji i detaljniji opis bolji video!" icon={Clapperboard}
                iconColor="text-[#A0C1D1]" bgColor="bg-[#0047BB]" />
            <div className="px-4 lg:px-8 bg-[#CED9E5]">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 bg-white">
                            <FormField name="prompt" render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading} placeholder="Ribe koje plivaju u akvariju, 8k rezolucija, trajanje 5 sekundi" {...field} />
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
                    {!video && !isLoading && (
                        <Empty label="Trenutno nema generiranih videa. Generiraj video sada!" />
                    )}
                    {video && (
                        <video className="w-full aspect-video mt-8 rounded-lg border bg-black" controls>
                            <source src={video}/>
                        </video>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VideoPage;