document.getElementById('spinBtn').addEventListener('click', function() {
    const input = document.getElementById('optionsInput').value;
    
    // 1. Text beim Komma trennen und Leerzeichen entfernen
    const choices = input.split(',').map(item => item.trim()).filter(item => item !== "");

    if (choices.length > 0) {
        // 2. Zufallsindex generieren
        const randomIndex = Math.floor(Math.random() * choices.length);
        const winner = choices[randomIndex];

        // 3. Ergebnis anzeigen
        document.getElementById('result').innerText = winner;
    } else {
        alert("Bitte gib ein paar Optionen ein!");
    }
});