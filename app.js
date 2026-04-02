// --- NEU: Schnellwahl-Logik ---
const quickBtns = document.querySelectorAll('.quick-btn');
const inputField = document.getElementById('optionsInput');

quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const word = btn.innerText; // Holt das Wort aus dem Button (z.B. "Pizza")
        
        // Check: Wenn schon was im Feld steht und kein Komma am Ende ist, füge eins hinzu
        if (inputField.value.trim() !== "" && !inputField.value.endsWith(',')) {
            inputField.value += ", ";
        }
        
        // Füge das Wort ein
        inputField.value += word;
    });
});
// ------------------------------

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

    // NEU: Den Status-Text greifen
    const statusText = document.getElementById('statusText');
    
    // 1. Button deaktivieren, damit man nicht 10x klickt während es läuft
    btn.disabled = true;
    resultDiv.style.color = "#e35e5e"; // Farbe beim Spinnen

    // NEU: Trommelwirbel-Text anzeigen!
    statusText.innerText = "Trommelwirbel... die Entscheidung fällt!";

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
            
            // NEU: Status-Text zum Finale ändern!
            statusText.innerText = "Und die Entscheidung ist...";

            // Ergebnis episch präsentieren
            resultDiv.innerText = "🎉 " + finalWinner + " 🎉";
            resultDiv.style.color = "#00ffcc"; // Mach es z.B. Neon-Türkis
            
            // Button wieder freigeben
            btn.disabled = false; 

            // Konfetti Effekt auslösen (confetti-Bibliothek)
            confetti({
                particleCount: 150, // Anzahl der Schnipsel (gut für Performance)
                spread: 80,         // Wie weit es streut
                origin: { y: 0.6 }  // Startet leicht unter der Mitte des Bildschirms
            });
        }
    }, speed);
});

// --- NEU: Dark Mode Toggle ---
const themeBtn = document.getElementById('themeToggle');

themeBtn.addEventListener('click', () => {
    // classList.toggle ist pure Magie: Es schaltet die Klasse an und aus!
    document.body.classList.toggle('dark-mode');
    
    // Icon auf der Taste wechseln (Sonne oder Mond)
    if (document.body.classList.contains('dark-mode')) {
        themeBtn.innerText = '☀️';
    } else {
        themeBtn.innerText = '🌙';
    }
});
// ------------------------------