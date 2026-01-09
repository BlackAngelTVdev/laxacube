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

const serverIP = "laxacube.ch"; // Remplace par l'IP ou le domaine de ton serveur
const serverPort = 25565; // Par défaut, c'est 25565

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

async function setLatestRelease() {
    const userAgent = window.navigator.userAgent;
    const linkElement = document.getElementById('download-link');
    
    const apiUrl = "https://api.github.com/repos/BlackAngelTVdev/LaxaCube-Launcher/releases/latest";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        let downloadUrl = data.html_url; 

        if (userAgent.indexOf("Win") !== -1) {

            const asset = data.assets.find(a => a.name.endsWith('.exe'));
            if (asset) downloadUrl = asset.browser_download_url;
        } 
        else if (userAgent.indexOf("Mac") !== -1) {

            const asset = data.assets.find(a => a.name.endsWith('.dmg'));
            if (asset) downloadUrl = asset.browser_download_url;
        } 
        else if (userAgent.indexOf("Linux") !== -1) {

            const asset = data.assets.find(a => a.name.endsWith('.AppImage'));
            if (asset) downloadUrl = asset.browser_download_url;
        }

        linkElement.href = downloadUrl;
    } catch (error) {
        console.error("Erreur lors de la récupération de la release GitHub:", error);
    }
}


setLatestRelease();

// Mettre à jour toutes les 30 secondes
fetchPlayerCount();
setInterval(fetchPlayerCount, 30000);