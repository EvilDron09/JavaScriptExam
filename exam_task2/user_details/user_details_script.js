const textValue = document.getElementsByTagName('p');
const posts = document.getElementById('posts');

const urlParams = new URLSearchParams(window.location.search);
const urlUserId = urlParams.get('id');

fetch(`https://jsonplaceholder.typicode.com/users?id=${urlUserId}`)
    .then(response => response.json())
    .then(user => {
        console.log(user);
        for (const element of user) {
            textValue[0].innerText = `ID: ${element.id}`;
            textValue[1].innerText = `Name: ${element.name}`;
            textValue[2].innerText = `Username: ${element.username}`;
            textValue[3].innerText = `City: ${element.address.city}
            Street: ${element.address.street}
            Suite: ${element.address.suite}
            Zipcode: ${element.address.zipcode}`;
            textValue[4].innerText = `Lat: ${element.address.geo.lat}
            Lng: ${element.address.geo.lng}`;
            textValue[5].innerText = `Business: ${element.company.bs}
            Catch Phrase: ${element.company.catchPhrase}
            Name: ${element.company.name}`;
            textValue[6].innerText = `Website: ${element.website}
            Email: ${element.email}
            Phone: ${element.phone}`;
        }
    });
