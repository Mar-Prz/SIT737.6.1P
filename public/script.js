document.getElementById('calculate').addEventListener('click', function() {
    const inputA = document.getElementById('inputA').value;
    const inputB = document.getElementById('inputB').value;
    const operation = document.getElementById('operation').value;

    fetch(`/${operation}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ a: Number(inputA), b: Number(inputB), operation: String(operation) }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerHTML = `Result: <span>${data.result}</span>`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});