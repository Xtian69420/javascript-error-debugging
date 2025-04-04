const names = [
    "ALFANTA, AXL CYRUS", "ARANCES, JOHN MARC", "BARRIOS, EDELSON",
    "BEATO, GLEAN", "BERTOS, JOHN NATHANIEL", "BUMENGEG, LUKE", "CRUZ, JOHN MATTHEW",
    "DAYALO, GILBERT", "DE MESA, JOHN SEDRIC", "DILAG, ANDREI", "DOMAGTOY, EDRIAN",
    "FERNANDEZ, LOUIS KEN CEDRIC", "GANAL, ODCH UILLIAM", "IBARRIENTOS, CIANHA",
    "KATUG, NASH ANDREI", "LABACO, HARVEY ADRIAN", "LATONERO, TERRENCE JHON",
    "MALTO, KRISTINE", "RUFO, ARMAN STEVE", "SANTIAGO, JAIRUS", "TORRES, NELSON", 
    "VIJAR, MARK DEYNIEL"
];

let namesStatus = {};  

names.forEach(name => {
    namesStatus[name] = true;
});

const pickButton = document.getElementById('pick');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close');
const modalName = document.getElementById('modal-name');
const removeButton = document.getElementById('remove');
const keepButton = document.getElementById('keep');
const gl = document.getElementById('gl');

let currentName = "";

function getRandomKeptName() {
    const keptNames = names.filter(name => namesStatus[name] === true);
    if (keptNames.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * keptNames.length);
    return keptNames[randomIndex];
}

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function startPicking() {
    let counter = 0;

    const namePickingInterval = setInterval(function() {
        gl.textContent = "PICKING";

        const randomName = getRandomKeptName();
        if (randomName) {
            modalName.textContent = randomName;
        }

        counter += 200;
        if (counter >= 3000) { 
            clearInterval(namePickingInterval);

            currentName = getRandomKeptName();
            modalName.textContent = currentName;  
            gl.textContent = 'GOOD LUCK!';

            triggerConfetti(); 
        }
    }, 200);  
}

function triggerConfetti() {
    var duration = 15 * 1000;  // 15 seconds duration
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }; // Set zIndex to a high value

    function confettiEffect() {
        var timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
            return clearInterval(confettiInterval);
        }

        var particleCount = 50 * (timeLeft / duration);
        confetti({
            ...defaults, 
            particleCount, 
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
            ...defaults, 
            particleCount, 
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
    }

    var confettiInterval = setInterval(confettiEffect, 250);
}


pickButton.addEventListener('click', function() {
    startPicking();  
    modal.style.display = "block";  
});

closeModal.addEventListener('click', function() {
    modal.style.display = "none";
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

removeButton.addEventListener('click', function() {
    namesStatus[currentName] = false;
    modal.style.display = "none";
});

keepButton.addEventListener('click', function() {
    namesStatus[currentName] = true;
    modal.style.display = "none";
});
