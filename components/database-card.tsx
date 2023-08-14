import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import DeleteButton from './delete-button';
import DownloadButton from './download-button';
import EditButton from './edit-button';
import { toast } from 'react-hot-toast';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const DatabaseCard = () => {

    const [dataschemas, setDataschemas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const dataschemasPerPage = 5;
    const startIndex = (currentPage - 1) * dataschemasPerPage;
    const endIndex = startIndex + dataschemasPerPage;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/saved', {
                    cache: 'no-store',
                });

                if (!res.ok) {
                    toast.error("Failed to fetch data!");
                }

                const dataschemasData = await res.json();
                setDataschemas(dataschemasData.data);
                setIsLoading(false);

            } catch (error) {
                toast.error("Failed to fetch data!");
            }
        };

        fetchData();
    }, []);

    const updateTitle = (id : any, newTitle : any)  => {
        setDataschemas((prevDataschemas) : any =>
            prevDataschemas.map((schema : any) =>
                schema._id === id ? { ...schema, title: newTitle } : schema
            )
        );
    };

    const handleTopicDeleted = (deletedId : any) => {
        setDataschemas((prevDataschemas) =>
            prevDataschemas.filter((schema : any) => schema._id !== deletedId)
        );
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const visibleDataschemas = dataschemas.slice(startIndex, endIndex);

    return (
        <div className="px-24">
            {visibleDataschemas.map((d: any) => (
                <div key={d._id} className='border-[#25242] border p-5 rounded-lg bg-white mb-4 flex gap-x-8 '>
                    <div className='flex flex-col gap-y-4 flex-grow text-justify'>
                        <h1 className='text-xl font-bold text-center text-[#252422]'>{d.title}</h1>
                        <h2 className='text-lg text-center text-black'> Prompt: {d.prompt}</h2>
                        <div className='text-base text-black'>
                            Answer: {d.type === "Code" ? <ReactMarkdown>{d.answer}</ReactMarkdown> : d.answer}
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-4'>
                        <EditButton
                            id={d._id}
                            initialTitle={d.title}
                            onTitleChange={(newTitle: string) => updateTitle(d._id, newTitle)}
                        />
                        <DownloadButton  data={d} />
                        <DeleteButton id={d._id} onTopicDeleted={handleTopicDeleted} />
                    </div>
                </div>
            ))}
            <div className="mt-4 flex justify-center">
                {currentPage > 1 && (
                    <Button className="mr-2 rounded-full bg-[#0047BB] text-[#CED9E5] hover:bg-[#0047BB]" onClick={handlePreviousPage}>Previous</Button>
                )}
                {dataschemas.length > endIndex && (
                    <Button className="rounded-full bg-[#0047BB] text-[#CED9E5] hover:bg-[#0047BB]" onClick={handleNextPage}>Next</Button>
                )}
            </div>
        </div>
    );
};

export default DatabaseCard;
