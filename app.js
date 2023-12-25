//Déclaration des variables
const userInformation = {};
const textarea = document.getElementById("textarea");
const researchButton = document.getElementById('research-button');
const resultsContainer = document.getElementById('results-container');
const userPicture = document.getElementsByClassName('user-picture');

//Fetch Github API
const fetchAllUserInformation = async () => {
    const response = await fetch(`https://api.github.com/users?per_page=1000`);
    if (!response.ok) throw new Error('Error');
    const data = await response.json();
    console.log(data);

//Crée un objet avec le pseudo Github en clé et l'avatar en valeur associée
    for (const user of data) {
        userInformation[user.login] = {
            avatar_url: user.avatar_url,
            html_url: user.html_url
        };
    }
};


function researchUser() {
    const text = textarea.value.toLowerCase(); 
    // Nettoyer résultats précédents
    resultsContainer.innerHTML = ''; 

    for (const username in userInformation) {
        if (username.toLowerCase().includes(text)) {
            const user = userInformation[username];
            const userInfo = document.createElement('div');
            userInfo.innerHTML = 
            `<div class="user-container"> 
                <h1>${username}</h1>
                <a href="${user.html_url}">
                <img src="${user.avatar_url}" alt="${username}'s avatar class="user-picture">
                </a>
            </div>`;
            resultsContainer.appendChild(userInfo);
        }
    }
};





//Le fait de cliquer sur le bouton de recherche affiche la fonction de recherche de l'utilisateur
researchButton.addEventListener('click', researchUser);



fetchAllUserInformation();
    // .then(() => {
    //     console.log(userInformation);
    // })
    // .catch(error => console.error('Error fetching user information:', error));

    
