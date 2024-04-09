window.onload = () => {
    updateDOM();
};

//Funktion för att hämta data från api
async function fetchData() {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await fetch(`https://dt207g-mom2-1.onrender.com/api/workexperiences/`);
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error('Data kunde inte hämtas', error);
    }
}

//Skriv ut data i DOM
async function updateDOM() {
    //Laddningsindikator
    const loadingIndicatorEl = document.getElementById('loadingIndicator');
    loadingIndicatorEl.style.display = 'block';
    try {
        const data = await fetchData();

        const workExpsEl = document.getElementById('workExps');
        workExpsEl.innerHTML = '';

        //Iterera över varje objekt
        data.forEach(exp => {
            
            //Formatera datum - ta bort klockslag
            const startDate = exp.startdate.split('T')[0];
            const endDate = exp.enddate.split('T')[0];

            //Skriver ut i DOM
            workExpsEl.innerHTML += `
                <div class="workExp">
                    <h2>${exp.jobtitle} @ ${exp.companyname}</h2>
                    <p>Plats: ${exp.location}</p>
                    <p>Startdatum: ${startDate}</p>
                    <p>Slutdatum: ${endDate}</p>
                    <p>Beskrivning: ${exp.description}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error('Problem med att uppdatera DOM', error);
    } finally {
         //Dölj laddningsindikatorn
        loadingIndicator.style.display = 'none';
    }
}