// --- NEU: Sound-Effekte laden ---
// Wir nutzen hier direkte Links zu kostenlosen Sounds. 
// Später  z.B. 'sounds/mein-klick.mp3' eintragen, wenn  eigene.
const tickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'); 
const winSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'); 

// Lautstärke etwas runterdrehen (0.0 bis 1.0)
tickSound.volume = 0.2; 
winSound.volume = 0.6;
// --------------------------------

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

// --- NEU: Löschen-Button Logik ---
const clearBtn = document.getElementById('clearBtn');

clearBtn.addEventListener('click', () => {
    // 1. Textfeld leeren
    document.getElementById('optionsInput').value = "";
    
    // 2. Ergebnis-Anzeige zurücksetzen
    document.getElementById('result').innerText = "?";
    document.getElementById('result').style.color = ""; 
    
    // 3. Trommelwirbel-Text (falls vorhanden) ausblenden
    const statusText = document.getElementById('statusText');
    if(statusText) {
        statusText.innerText = "";
    }
});
// ---------------------------------


document.getElementById('spinBtn').addEventListener('click', function() {
    const input = document.getElementById('optionsInput').value;
    const choices = input.split(',').map(item => item.trim()).filter(item => item !== "");

    /* Alt, mit Standard Alert Check: Sind mindestens 2 Optionen da?
    if (choices.length < 2) {
        alert("Bitte gib mindestens zwei Optionen ein, sonst gibt es ja nichts zu entscheiden!");
        return; // Stoppt das Script hier
    }*/

     // Neu, Check: Sind mindestens 2 Optionen da?
    if (choices.length < 2) {
        Swal.fire({
            title: 'Nur ein Begriff? 🛑',
            text: 'Bitte gib mindestens zwei Optionen ein, sonst gibt es ja nichts zu entscheiden!',
            icon: 'warning',
            confirmButtonText: 'Alles klar',
            confirmButtonColor: '#3085d6' // Mach den Button passend blau
        });
        return; // Stoppt das Script
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

        //Ticking-Sound bei jedem Wort-Wechsel!
        // Der Trick: currentTime = 0 setzt den Sound immer wieder sofort auf Anfang, 
        // selbst wenn er vom letzten Tick noch nicht ganz fertig war.
        tickSound.currentTime = 0; 
        tickSound.play();

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

            //  Gewinner-Sound abspielen
            winSound.play();

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