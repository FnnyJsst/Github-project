const usernames = ['user1', 'user2', 'user3']; // Add the GitHub usernames you want to fetch

const fetchUserInformation = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
        console.error(`Error fetching data for ${username}: ${response.statusText}`);
        return null;
    }
    const data = await response.json();
    return data;
};

const fetchAllUserInformation = async () => {
    const userPromises = usernames.map(username => fetchUserInformation(username));
    const userData = await Promise.all(userPromises);
    return userData;
};

fetchAllUserInformation()
    .then(users => {
        console.log(users);
    })
    .catch(error => {
        console.error('Error fetching user information:', error);
    });
