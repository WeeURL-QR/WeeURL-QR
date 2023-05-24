import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { QRCodeSVG, QRCodeCanvas, QRCode } from 'qrcode.react';

import Output from './Output.jsx';
import Input from './Input.jsx';

function Home() {
    const [longUrl, setlongUrl] = useState('');
    const [newUrl, setNewUrl] = useState('');

    function generate(e) {
        fetch('/api/getURL', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON',
            },
            body: JSON.stringify({ longUrl: longUrl }),
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                console.log(data);
                // we would want to set new url to wee url - qr, no /api
                setNewUrl('localhost:8080/api/'+ data);
                console.log('newUrl: ', newUrl);
            });
    }

    const downloadQR = () => {
        const canvas = document.getElementById('QR');
        // Convert canvas image to data URL (PNG format)
        const dataUrl = canvas.toDataURL('image/png');
        // navigator.clipboard.write(new ClipboardItem({'image/png':dataUrl}))
        // Create a link element
        const downloadLink = document.createElement('a');
        downloadLink.href = dataUrl;
        downloadLink.download = 'QR.png';
        // Programmatically trigger a click event on the link element
        downloadLink.click();
    };

    return (
        <div className="home">
            <div className="Input">
                <div className="instructions">
                    <p>Instructions:</p>
                    <ol>
                        <li>
                            Input the URL you would like shortend into the input
                            box
                        </li>
                        <li>
                            Then click 'Generate' and wait for your new shortend
                            URL and QR Code to appear
                        </li>
                        <li>
                            Copy your URL and save your QR Code for future use{' '}
                            <br />
                            Note: Save your QR Code as this will not be saved to
                            your profile
                        </li>
                    </ol>
                </div>
                <Input
                    setlongUrl={setlongUrl}
                    longUrl={longUrl}
                    generate={generate}
                />
            </div>
            {(newUrl !== '') && (
                <div className="Output">
                    <Output newUrl={newUrl} />
                    <QRCodeCanvas id="QR" value={newUrl} />
                    <button onClick={downloadQR}>Save QR</button>
                </div>
            )}
        </div>
    );
}

export default Home;

// {newUrl && ...}: This is a conditional rendering statement using the logical AND operator (&&).
// It checks if the newUrl variable is truthy (not null, undefined, 0, or false).
// If newUrl is truthy, the code inside the curly braces ({...}) will be rendered.
