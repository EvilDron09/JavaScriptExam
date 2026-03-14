const userSection = document.getElementById('users');

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users =>{
        for (const {id, name} of users) {
            const userDiv = document.createElement('div');
            const userID = document.createElement('h2');
            userID.innerText = `${id}`;
            const nameUser = document.createElement('p');
            nameUser.innerText =`${name}`;
            const userInfoButton = document.createElement('button');
            userInfoButton.addEventListener('click',()=>{
                window.location.href =`../user_details/user_details.html?id=${id}`;
            })
            userInfoButton.innerText ='All Information';
            userDiv.append(userID,nameUser,userInfoButton);
            userSection.appendChild(userDiv);
        }
    })
