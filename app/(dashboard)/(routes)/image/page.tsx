"use client";

import * as z from "zod";
import axios from "axios";
import { Heading } from "@/components/heading";
import { Download, ImagePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { toast } from "react-hot-toast";

const ImagePage = () => {

    const router = useRouter();

    const [images, setImages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "256x256"
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]);

            const response = await axios.post("/api/image", values);

            const urls = response.data.map((image: { url: string }) => image.url);

            setImages(urls);

            form.reset();

        } catch (error: any) {
            toast.error("Dogodila se greška. Pokušaj ponovo!");
        } finally {
            router.refresh();
        }
    };

    return (
        <div className="px-2">
            <Heading tittle="Generiranje slika" description="Opiši kakvu sliku želiš, odaberi količinu i rezoluciju!" icon={ImagePlus}
                iconColor="text-[#FFE66D]" bgColor="bg-[#0047BB]" />
            <div className="px-4 lg:px-8 bg-[#CED9E5]">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 bg-white">
                            <FormField name="prompt" render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-6">
                                    <FormControl className="m-0 p-0">
                                        <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading} placeholder="Slatki psi" {...field} />
                                    </FormControl>
                                </FormItem>
                            )} />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {amountOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="resolution"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {resolutionOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <Button className="rounded-full col-span-12 lg:col-span-2 w-full bg-[#0047BB] text-[#CED9E5] hover:bg-[#0047BB] text-md" disabled={isLoading}>
                                Generiraj
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-10 bg-white rounded-lg">
                            <Loader />
                        </div>
                    )}
                    {images.length == 0 && !isLoading && (
                        <Empty label="Trenutno nema generiranih slika. Generiraj neke!" />
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {images.map((src) => (
                            <Card
                                key={src}
                                className="rounded-lg overflow-hidden">
                                <div className="relative aspect-square">
                                    <Image alt="Image" fill src={src} />
                                </div>
                                <CardFooter className="p-2">
                                    <Button onClick={() => window.open(src)}
                                        variant="secondary"
                                        className="w-full">
                                        <Download className="h-4 w-4 mr-2" />
                                        Download
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImagePage;