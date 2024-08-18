document.getElementById('sendButton').addEventListener('click', sendMessage);

async function sendMessage() {
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-WmK-Z1Qt7kBAWExiwU4QWxLV5uugs1ppPuz4VXVn_-T3BlbkFJw5ZGieI_FrVGHzVyEfTiDaPQHj-X4YTRvUpXec3hEA' // Substitua com sua chave de API
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
                max_tokens: 150
            })
        });

        if (!response.ok) {
            // Mostrar o status do erro e a resposta completa para depuração
            const errorText = await response.text();
            console.error(`HTTP error! Status: ${response.status} - ${errorText}`);
            throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        document.getElementById('response').innerText = data.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('response').innerText = 'Erro ao obter resposta. Tente novamente.';
    }
}
