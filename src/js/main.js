export { updateDOM };

window.onload = () => {
    updateDOM();
};

//Funktion för att hämta data från api
async function fetchData() {
    try {
        //Används vid test av laddningsindikator
        //await new Promise(resolve => setTimeout(resolve, 11000));

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

    //Funktioner för att lägga till extra text om datan tar lång tid att ladda
    setTimeout(() => {
        const p = document.createElement('p');
        p.textContent = 'Utvecklarna på Render måste ha tryckt på snooze-knappen igen...';
        loadingIndicatorEl.appendChild(p);
    }, 3000);

    setTimeout(() => {
        const p = document.createElement('p');
        p.textContent = 'Håll ut, vi skickar en söktrupp efter Render-serverns on-knapp!';
        loadingIndicatorEl.appendChild(p);
    }, 6000);

    setTimeout(() => {
        const p = document.createElement('p');
        p.textContent = 'Render-servern är upptagen med att titta på kattfilmer...';
        loadingIndicatorEl.appendChild(p);
    }, 9000);

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
                <article class="workExp">
                    <h3>${exp.jobtitle} @ ${exp.companyname}</h3>
                    <p><strong>Plats:</strong> ${exp.location}</p>
                    <p><strong>Startdatum:</strong> ${startDate}</p>
                    <p><strong>Slutdatum:</strong> ${endDate}</p>
                    <p><strong>Beskrivning:</strong> ${exp.description}</p>
                    <button class="button deleteBtn" data-id="${exp.id}">Ta bort</button>
                </article>
                <span class="spanLine"></span>
            `;
        });
    } catch (error) {
        console.error('Problem med att uppdatera DOM', error);
    } finally {
         //Dölj laddningsindikatorn
        loadingIndicator.style.display = 'none';
    }
}