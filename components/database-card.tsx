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
        <div className="max-w-screen-lg mx-auto">
            {visibleDataschemas.map((t: any) => (
                <div key={t._id} className='border-black border p-4 rounded-lg bg-muted mb-4 flex gap-x-8'>
                    <div className='flex flex-col gap-y-4 flex-grow'>
                        <h2>{t.title}</h2>
                        <h2>{t.prompt}</h2>
                        <div className='text-sm'>
                            {t.type === "Code" ? <ReactMarkdown>{t.answer}</ReactMarkdown> : t.answer}
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-4'>
                        <EditButton
                            id={t._id}
                            initialTitle={t.title}
                            onTitleChange={(newTitle: string) => {
                                // Handle title change if needed
                            }}
                        />
                        <DownloadButton topic={t} />
                        <DeleteButton id={t._id} onTopicDeleted={handleTopicDeleted} />
                    </div>
                </div>
            ))}
            <div className="mt-4 flex justify-center">
                {currentPage > 1 && (
                    <Button className="mr-2" onClick={handlePreviousPage}>Previous</Button>
                )}
                {dataschemas.length > endIndex && (
                    <Button onClick={handleNextPage}>Next</Button>
                )}
            </div>
        </div>
    );
};

export default DatabaseCard;
