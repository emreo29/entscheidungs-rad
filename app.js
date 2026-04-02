document.getElementById('spinBtn').addEventListener('click', function() {
    const input = document.getElementById('optionsInput').value;
    const choices = input.split(',').map(item => item.trim()).filter(item => item !== "");

    // Check: Sind mindestens 2 Optionen da?
    if (choices.length < 2) {
        alert("Bitte gib mindestens zwei Optionen ein, sonst gibt es ja nichts zu entscheiden!");
        return; // Stoppt das Script hier
    }

    const resultDiv = document.getElementById('result');
    const btn = document.getElementById('spinBtn');
    
    // 1. Button deaktivieren, damit man nicht 10x klickt während es läuft
    btn.disabled = true;
    resultDiv.style.color = "#e35e5e"; // Farbe beim Spinnen

    let counter = 0;
    const spinTime = 2000; // Wie lange soll es drehen? 2000 Millisekunden = 2 Sekunden
    const speed = 100; // Alle 100ms wechselt das Wort

    // 2. Der "Roulette" Effekt (setInterval wiederholt etwas immer wieder)
    const interval = setInterval(() => {
        // Zeige irgendein zufälliges Wort aus der Liste
        const randomTemp = Math.floor(Math.random() * choices.length);
        resultDiv.innerText = choices[randomTemp];
        counter += speed;

        // 3. Wenn die 2 Sekunden um sind: Stoppen und Gewinner ziehen!
        if (counter >= spinTime) {
            clearInterval(interval); // Stoppt den Roulette-Effekt
            
            // Endgültigen Gewinner ermitteln
            const finalWinner = choices[Math.floor(Math.random() * choices.length)];
            
            // Ergebnis episch präsentieren
            resultDiv.innerText = "🎉 " + finalWinner + " 🎉";
            resultDiv.style.color = "#00ffcc"; // Mach es z.B. Neon-Türkis
            
            // Button wieder freigeben
            btn.disabled = false; 
        }
    }, speed);
});