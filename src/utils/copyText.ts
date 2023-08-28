const CopyText = (text: string) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
            .then(() => {
                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } else {
        const input = document.createElement('input');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
    }
}

export default CopyText;