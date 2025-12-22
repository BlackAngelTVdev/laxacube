document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a[href^='#']"); // Sélectionne seulement les liens d'ancre internes
    
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Empêche le comportement par défaut

            const targetId = this.getAttribute("href").substring(1); // Récupère l'ID de la section cible
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth" // Active le scroll fluide
                });
            }
        });
    });
});

const serverIP = "mango.fps.ms"; // Remplace par l'IP ou le domaine de ton serveur
const serverPort = 26246; // Par défaut, c'est 25565

async function fetchPlayerCount() {
    try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${serverIP}:${serverPort}`);
        const data = await response.json();
        
        if (data && data.online) {
            document.getElementById("players-online").textContent = data.players.online;
        } else {
            document.getElementById("players-online").textContent = "Serveur hors ligne";
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du nombre de joueurs :", error);
        document.getElementById("players-online").textContent = "Erreur";
    }
}

// Mettre à jour toutes les 30 secondes
fetchPlayerCount();
setInterval(fetchPlayerCount, 30000);