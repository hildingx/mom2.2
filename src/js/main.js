//Funktion för att hämta data från api
async function fetchData() {
    try {
        const response = await fetch(`https://dt207g-mom2-1.onrender.com/api/workexperiences/`);
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error('Data kunde inte hämtas', error);
    }
}

//Skriv ut data i DOM
async function updateDOM() {
    try {
        const data = await fetchData();

        
    } catch (error) {
        console.error('Problem med att uppdatera DOM', error);
    }
    
}

