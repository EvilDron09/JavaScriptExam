const commentsDiv = document.getElementById('comments');
const postID = document.getElementsByTagName('h1');
const textPost = document.getElementsByTagName('p');

const urlPost = new URLSearchParams(window.location.search);
const urlPostID = urlPost.get('id');

fetch(`https://jsonplaceholder.typicode.com/posts/${urlPostID}`)
    .then(response => response.json())
    .then(post => {
        postID[0].innerText = `Post number: ${post.id}`;
        textPost[0].innerHTML = `Title post: ${post.title}`;
        textPost[1].innerHTML = `Post: ${post.body}`;
    })

fetch(`https://jsonplaceholder.typicode.com/posts/${urlPostID}/comments`)
    .then(response => response.json())
    .then(comments =>{
        for (const {id, name, email, body} of comments) {
            const commentDiv = document.createElement('div');
            const commentName = document.createElement('h3');
            commentName.innerText =`Comment Name: ${name}`;
            const commentID = document.createElement('p');
            commentID.innerText = `Comment number: ${id}`;
            const commentEmail = document.createElement('p');
            commentEmail.innerText = `Email: ${email}`;
            const commentBody = document.createElement('p');
            commentBody.innerHTML = `${body}`;
            commentDiv.append(commentName,commentID, commentEmail, commentBody);
            commentsDiv.appendChild(commentDiv);
        }
    })
