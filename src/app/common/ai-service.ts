
// Canvas-based fingerprint function
async function canvasFingerprint(): Promise<string> {
    var canvas = document.body.appendChild(document.createElement('canvas'));
    canvas.width = 600;
    canvas.height = 300;
    canvas.style.display = "none";
    const ctx = canvas.getContext("2d");
    const size = 24;
    const diamondSize = 28;
    const gap = 4;
    const startX = 30;
    const startY = 30;
    const blue = "#1A3276";
    const orange = "#F28C00";
    const colorMap = [
        ["blue", "blue", "diamond"],
        ["blue", "orange", "blue"],
        ["blue", "blue", "blue"]
    ];
    function drawSquare(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, size, size);
    }
    function drawDiamond(centerX, centerY, size, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - size / 2);
        ctx.lineTo(centerX + size / 2, centerY);
        ctx.lineTo(centerX, centerY + size / 2);
        ctx.lineTo(centerX - size / 2, centerY);
        ctx.closePath();
        ctx.fill();
    }
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const type = colorMap[row][col];
            const x = startX + col * (size + gap);
            const y = startY + row * (size + gap);
            if (type === "blue") drawSquare(x, y, blue);
            else if (type === "orange") drawSquare(x, y, orange);
            else if (type === "diamond") drawDiamond(x + size / 2, y + size / 2, diamondSize, orange);
        }
    }
    ctx.font = "20px Arial";
    ctx.fillStyle = blue;
    ctx.textBaseline = "middle";
    ctx.fillText("Syncfusion", startX + 3 * (size + gap) + 20, startY + size + gap);
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = "rgb(255,0,255)";
    ctx.beginPath(); ctx.arc(50, 200, 50, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgb(0,255,255)";
    ctx.beginPath(); ctx.arc(100, 200, 50, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgb(255,255,0)";
    ctx.beginPath(); ctx.arc(75, 250, 50, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgb(255,0,255)";
    ctx.beginPath();
    ctx.arc(200, 200, 75, 0, Math.PI * 2, true);
    ctx.arc(200, 200, 25, 0, Math.PI * 2, true);
    ctx.fill("evenodd");
    const sha256 = async function (str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    };
    const visitorID = await sha256(canvas.toDataURL());
    canvas.remove(); // Clean up
    return visitorID;
}

export const serverAIRequest = async (settings: any): Promise<any> => {
    try {
        const visitorId = await canvasFingerprint();
        let response = await fetch('https://ai-samples-server-f5hta2h9g5aqhcfg.southindia-01.azurewebsites.net/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                visitorId,
                messages: settings
            })
        })
        let result = await response.json();
        if (!response.ok) {
            throw new Error(result.error || 'Network response was not ok');
        }
        result.response = result.response.replace('END_INSERTION', '');
        return result.response;
    } catch (error) {
        if (error.message.includes('token limit')) {
            document.querySelector('.banner-message').innerHTML = error.message;
            document.querySelector('.sb-header1').classList.remove('sb-hide');
        }
        else {
            console.error('There was a problem with your fetch operation:', error);
        }
    }
};


export const getOpenAiModelRTE = async (subQuery: string, promptQuery: string): Promise<any> => {
    try {
        const visitorId = await canvasFingerprint();
        let response = await fetch('https://ai-samples-server-f5hta2h9g5aqhcfg.southindia-01.azurewebsites.net/api/rte', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                visitorId,
                subQuery,
                promptQuery
            })
        });

        let result = await response.json();
        if (!response.ok) {
            throw new Error(result.error || 'Network response was not ok');
        }

        return result.response;
    } catch (error) {
        if (error.message.includes('token limit')) {
            document.querySelector('.banner-message').innerHTML = error.message;
            document.querySelector('.sb-header1').classList.remove('sb-hide');
        } else {
            console.error('There was a problem with your fetch operation:', error);
        }
    }
};
