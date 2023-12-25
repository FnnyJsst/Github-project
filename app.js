//Déclaration des variables
const userInformation = {};
const textarea = document.getElementById("textarea");
const researchButton = document.getElementById('research-button');
const resultsContainer = document.getElementById('results-container');

//Fetch Github API
const fetchAllUserInformation = async () => {
    const response = await fetch(`https://api.github.com/users?per_page=100`);
    if (!response.ok) throw new Error('Error');
    const data = await response.json();

//Crée un objet avec le pseudo Github en clé et l'avatar en valeur associée
    for (const user of data) {
        userInformation[user.login] = {
            avatar_url: user.avatar_url
        };
    }
};


const researchUser = () => {
    const text = textarea.value;
    //Nettoyer les résultats précédents
    resultsContainer.innerHTML = ''; 

    //Si le texte recherché est un psudo Github, on affiche l'username et son avatar
    for (const username in userInformation) {
        if (username.includes(text)) {
            const user = userInformation[username];
            const userInfo = document.createElement('div');
            userInfo.innerHTML = `
                <h1>${username}</h1>
                <img src="${user.avatar_url}" alt="${username}'s avatar">
            `;
            resultsContainer.appendChild(userInfo);
        }
    }
};

//Le fait de cliquer sur le bouton de recherche affiche la fonction de recherche de l'utilisateur
researchButton.addEventListener('click', researchUser);

fetchAllUserInformation()
    .then(() => {
        console.log(userInformation);
    })
    .catch(error => console.error('Error fetching user information:', error));
