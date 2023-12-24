const usernames = [];
const textarea = document.getElementById("textarea");
const researchButton = document.getElementById('research-button');

const fetchUserInformation = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
        console.error(`Error fetching user information for ${username}:`, response.status);
        throw new Error('Error');
    }
    return response.json();
};

// Fetch all usernames from GitHub
const fetchAllUsernames = async () => {
    const response = await fetch(`https://api.github.com/users?per_page=100`);
    if (!response.ok) throw new Error('Error');
    const data = await response.json();

    for (const user of data) {
        usernames.push(user.login);
        usernames.push(user.avatar_url);
    }
};

fetchAllUsernames()
    .then(() => {
        console.log(usernames);
    })
    .catch(error => console.error('Error fetching usernames:', error));

    async function researchUser() {
        const text = textarea.value;
    
        for (const username of usernames) {
            if (text.includes(username)) {
                try {
                    const user = await fetchUserInformation(username);
                    let userInfo = document.getElementById('user-info');
                    userInfo.textContent = `${user.login}`;
                    userInfo.innerHTML = `<div>
                    <h3> ${user.login}</h3>
                        <img src=${user.avatar_url}</img>
                    </div>`
                    

                break;
                } catch (error) {
                    console.error('Error fetching user information:', error);
                }
            }
        }
    }
    

researchButton.addEventListener('click', researchUser);

