// Funkce pro kontrolu hesla a spuštění všeho
function checkPassword() {
    const passInput = document.getElementById('passwordInput');
    const errorMsg = document.getElementById('error-msg');
    const pass = passInput.value;

    // === ZDE JE HESLO ===
    const correctPassword = "05122024";

    if (pass === correctPassword) {
        console.log("Heslo správné, spouštím magii...");

        // 1. SPUŠTĚNÍ HUDBY (MP3)
        // Vytvoříme nový audio objekt
        const audio = new Audio('lovesong.mp3');
        audio.loop = true;   // Bude hrát dokola
        audio.volume = 0;    // Začneme potichu pro fade-in efekt
        
        // Zkusíme přehrát
        audio.play().then(() => {
            console.log("Hudba hraje!");
            // Efekt postupného zesilování (fade-in) během 2 sekund
            let vol = 0;
            const fadeInterval = setInterval(() => {
                if (vol < 0.8) { // Cílová hlasitost 80%
                    vol += 0.05;
                    audio.volume = Math.min(vol, 1);
                } else {
                    clearInterval(fadeInterval);
                }
            }, 150); // Zvyšuje hlasitost každých 150ms
        }).catch(error => {
            console.error("Chyba přehrávání audia:", error);
            alert("Hudba se nepodařila spustit. Zkontroluj, zda máš soubor 'lovesong.mp3' ve složce!");
        });

        // 2. Animace odemčení
        const lockScreen = document.getElementById('lock-screen');
        const apologyPage = document.getElementById('apology-page');

        const text = "Vím, že někdy slova nestačí, a omlouvám se za všechno špatného, co jsem kdy v našem vztahu udělal. Chci, abys věděla, že jsi pro mě vším a bez tebe si svůj život nedokážu představit. Slibuji, že udělám vše pro to, abychom byli šťastní a naše láska byla silnější než kdy dřív. Miluji tě nade vše a doufám, že mi dáš další šanci ukázat ti, jak moc pro mě znamenáš.";
        const typeWriterElement = document.getElementById('typewriter-text');
        let i = 0;
        
        // Vyčistíme pro jistotu
        typeWriterElement.innerHTML = "";
        
        function typeWriter() {
            if (i < text.length) {
                typeWriterElement.innerHTML += text.charAt(i);
                i++;
                // Rychlost psaní (50ms)
                setTimeout(typeWriter, 50);
            }
        }
        
        // Spustíme chvilku poté, co se stránka objeví (po 1 sekundě)
        setTimeout(typeWriter, 1000);

        lockScreen.classList.remove('active-page');
        lockScreen.style.transform = "translateY(-150%)";

        apologyPage.classList.remove('content-below');
        apologyPage.classList.add('active-page');

        // 3. Spuštění efektů (srdíčka)
        startMagic();

        // Schování chyby
        errorMsg.style.display = "none";

    } else {
        // Chybné heslo
        errorMsg.style.display = "block";
        errorMsg.style.visibility = "visible";
        
        errorMsg.classList.remove('shake-animation');
        void errorMsg.offsetWidth; 
        errorMsg.classList.add('shake-animation');
        
        passInput.value = '';
    }
}

// Funkce pro přepínání stránek
// Funkce pro přepínání stránek (Rozšířená o 3. stránku)
function changePage(fromId, toId) {
    const fromPage = document.getElementById(fromId);
    const toPage = document.getElementById(toId);

    // 1. Z OMLUVY DO GALERIE (Jdeme dolů)
    if (fromId === 'apology-page' && toId === 'gallery-page') {
        fromPage.classList.remove('active-page');
        fromPage.style.transform = "translateY(-150%)"; // Omluva letí nahoru

        toPage.classList.remove('content-below');
        toPage.classList.add('active-page'); // Galerie přijíždí
    }
    // 2. Z GALERIE ZPĚT NA OMLUVU (Jdeme nahoru)
    else if (fromId === 'gallery-page' && toId === 'apology-page') {
        fromPage.classList.remove('active-page');
        fromPage.classList.add('content-below'); // Galerie padá dolů

        toPage.style.transform = ""; // Reset
        toPage.classList.add('active-page'); // Omluva se vrací

    }
    // 3. Z GALERIE DO FAVORITES (Jdeme ještě níž/dál)
    else if (fromId === 'gallery-page' && toId === 'favorites-page') {
        fromPage.classList.remove('active-page');
        fromPage.style.transform = "translateY(-150%)"; // Galerie letí nahoru pryč

        toPage.classList.remove('content-below');
        toPage.classList.add('active-page'); // Favorites přijíždí
    }
    // 4. Z FAVORITES ZPĚT DO GALERIE (Vracíme se)
    else if (fromId === 'favorites-page' && toId === 'gallery-page') {
        fromPage.classList.remove('active-page');
        fromPage.classList.add('content-below'); // Favorites padá dolů

        toPage.style.transform = ""; // Reset
        toPage.classList.add('active-page'); // Galerie se vrací
    }
}



// Magické efekty (Srdíčka)
function createFloatingElement() {
  const container = document.getElementById("garden-container");
  const elWrapper = document.createElement("div");
  elWrapper.classList.add("floating");

  const icons = [
    "fa-heart",
    "fa-heart",
    "fa-paper-plane",
    "fa-dove",
    "fa-star",
  ];
  const randomIcon = icons[Math.floor(Math.random() * icons.length)];

  elWrapper.innerHTML = `<i class="fas ${randomIcon}"></i>`;

  const randomLeft = Math.random() * 100;
  const randomSize = Math.random() * 20 + 15;
  const duration = Math.random() * 8 + 12;
  const hues = [340, 350, 0, 10, 45];
  const randomHue = hues[Math.floor(Math.random() * hues.length)];
  const color = `hsla(${randomHue}, 90%, 75%, 0.8)`;

  elWrapper.style.left = randomLeft + "vw";
  elWrapper.style.fontSize = randomSize + "px";
  elWrapper.style.color = color;

  const icon = elWrapper.querySelector("i");
  icon.style.animationDuration = duration + "s";

  container.appendChild(elWrapper);

  setTimeout(() => {
    elWrapper.remove();
  }, duration * 1000);
}

function startMagic() {
  setInterval(createFloatingElement, 800);
  for (let i = 0; i < 5; i++) setTimeout(createFloatingElement, i * 300);
}

// Enter klávesa
document.addEventListener("DOMContentLoaded", () => {
  const passInput = document.getElementById("passwordInput");
  if (passInput) {
    passInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        checkPassword();
      }
    });
  }
});

function updateDaysCounter() {
    // Datum začátku: 5. 12. 2024
    // Pozor: Měsíce v JS jsou 0-indexované (Prosinec = 11)
    const startDate = new Date(2024, 11, 5); 
    const today = new Date();
    
    // Rozdíl v čase (milisekundy)
    const timeDiff = today - startDate;
    
    // Převod na dny (zaokrouhlení dolů)
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    // Vložení do HTML
    const counterElement = document.getElementById('days-count');
    if (counterElement) {
        counterElement.innerText = daysDiff;
    }
}

// Spustíme výpočet ihned po načtení
updateDaysCounter();

// === AUTOMATICKÁ GALERIE ===

// Seznam romantických popisků, které se budou točit u fotek
const captions = [
    "Všechny naše úsměvy...",
    "Každý společný moment...",
    "Znamená pro mě svět.",
    "Jsi moje štěstí.",
    "Nejkrásnější chvíle.",
    "Miluji Tě ❤️",
    "Navždy spolu.",
    "Ty a já, vždy.",
    "Naše láska roste.",
    "Jsi můj poklad.",
    "Společné sny.",
    "Navždy tvůj.",
    "Můj svět jsi Ty.",
    "S tebou jsem doma.",
    "Každý den s tebou.",
    "Jsi moje inspirace.",
    "Miluji tvůj smích.",
    "Ty jsi můj sen.",
    "Jsi moje všechno."
];

function loadGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    
    // Začínáme od 1.jpg
    let index = 1; 
    let keepLoading = true;

    // Funkce, která zkusí načíst obrázek
    function tryLoadImage(i) {
        const img = new Image();
        const filename = `${i}.jpg`; // Zkoušíme 1.jpg, 2.jpg...
        
        img.src = filename;

        // Pokud obrázek existuje (načte se)
        img.onload = function() {
            // 1. Vytvoříme slide pro fotku
            const slideItem = document.createElement('div');
            slideItem.className = `carousel-item ${i === 1 ? 'active' : ''}`; // První je aktivní
            
            // Vybereme popisek (buď podle pořadí, nebo dokola)
            const captionText = captions[(i - 1) % captions.length];

            slideItem.innerHTML = `
                <img src="${filename}" class="d-block w-100 cinematic-img" alt="Foto ${i}">
                <div class="carousel-caption d-none d-md-block">
                    <p class="romantic-caption">${captionText}</p>
                </div>
            `;
            galleryContainer.appendChild(slideItem);

            // 2. Vytvoříme indikátor (tečku dole)
            const indicator = document.createElement('button');
            indicator.type = "button";
            indicator.setAttribute("data-bs-target", "#loveCarousel");
            indicator.setAttribute("data-bs-slide-to", i - 1);
            if (i === 1) indicator.className = "active";
            indicatorsContainer.appendChild(indicator);

            // 3. Zkusíme načíst další fotku (rekurze)
            tryLoadImage(i + 1);
        };

        // Pokud obrázek neexistuje (chyba 404) -> KONEC
        img.onerror = function() {
            console.log(`Načteno ${i - 1} fotek. Galerie připravena.`);
            // Konec smyčky, nic dalšího neděláme
        };
    }

    // Spustíme proces
    tryLoadImage(index);
}

// Spustíme načítání galerie po startu stránky
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
});

// === EFEKT SRDÍČEK PŘI KLIKNUTÍ ===
document.addEventListener('click', function(e) {
    // Vytvoříme 8 srdíček najednou
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.classList.add('click-heart');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        
        // Nastavíme pozici tam, kde se kliklo
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        
        // Náhodný směr rozletu (pomocí CSS proměnných)
        const x = (Math.random() - 0.5) * 150 + 'px'; // Rozlet do stran
        const y = (Math.random() - 0.5) * 150 + 'px'; // Rozlet nahoru/dolů
        heart.style.setProperty('--x', x);
        heart.style.setProperty('--y', y);
        
        // Náhodná barva (červená, růžová, bílá)
        const colors = ['#ff3366', '#ffadd0', '#ffffff'];
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(heart);

        // Úklid po animaci
        setTimeout(() => heart.remove(), 1000);
    }
});