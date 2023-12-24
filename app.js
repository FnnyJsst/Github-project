const usernames = ['user1', 'user2', 'user3'];

const fetchUserInformation = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error('Error');
    return response.json();
};

const fetchAllUserInformation = async () => Promise.all(usernames.map(fetchUserInformation));

fetchAllUserInformation()
    .then(users => console.log(users))
    .catch(error => console.error('Error fetching user information:', error));


function researchUser() {
    
}