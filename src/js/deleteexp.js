import { updateDOM } from './main.js';

document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('deleteBtn')) {
        const id = event.target.getAttribute('data-id');
        try {
            const response = await fetch(`https://dt207g-mom2-1.onrender.com/api/workexperiences/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Kunde inte ta bort posten');
            }

            alert('Arbetserfarenhet borttagen');
            //Uppdatera listan av arbetserfarenheter
            updateDOM();
        } catch (error) {
            console.error('Det gick inte att ta bort arbetserfarenheten:', error);
            alert(error.message);
        }
    }
});