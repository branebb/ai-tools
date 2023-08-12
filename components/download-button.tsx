import { Button } from "./ui/button";

const DownloadButton = ({ topic }: any) => {

    const downloadTopic = async () => {
        const content = `tittle: "${topic.tittle}"\ndescription: "${topic.description}"`;

        const blob = new Blob([content], { type: 'text/plain' });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${topic.tittle}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
          <Button onClick={downloadTopic}> Download</Button>
    );
}

export default DownloadButton;
