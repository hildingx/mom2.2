//Händelselyssnare till formulär 
document.getElementById('workExpForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    //Samla in och trimma data från formuläret
    const companyname = document.getElementById('companyname').value.trim();
    const jobtitle = document.getElementById('jobtitle').value.trim();
    const location = document.getElementById('location').value.trim();
    const startdate = document.getElementById('startdate').value.trim();
    const enddate = document.getElementById('enddate').value.trim();
    const description = document.getElementById('description').value.trim();

    const form = document.getElementById('workExpForm');

    //Validera input för att kontrollera att inga fält är tomma
    if (!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        alert('Alla fält måste fyllas i.');
        return;
    }

    //Skapa objekt med insamlad data från formuläret
    const expObj = { companyname, jobtitle, location, startdate, enddate, description };

    try {
        const response = await fetch('https://dt207g-mom2-1.onrender.com/api/workexperiences/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expObj)
        });
        if (!response.ok) {
            alert('Arbetserfarenheten kunde inte läggas till');
        } else {
            alert('Arbetserfarenhet tillagd');
            //Rensa formuläret
            form.reset();
        }
    } catch {
        alert('Arbetserfarenheten kunde inte läggas till');
        console.error('Det gick inte att lägga till arbetserfarenheten:', error);
    }
});