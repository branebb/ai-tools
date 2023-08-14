import { Button } from "./ui/button";

const DownloadButton = ({ data } : any) => {

    const downloadTopic = async () => {
        const content = `title: "${data.prompt}"\nprompt: "${data.prompt}"\nanswer:\n"${data.answer}"`;

        const blob = new Blob([content], { type: 'text/plain' });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${data.title}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
          <Button onClick={downloadTopic}> Download</Button>
    );
}

export default DownloadButton;
