let body = document.body;
let url = window.location.toString();

let nameFromUrl= (url) => {
    let getUrl = url.split('=');
    let name = getUrl[1];
    if (name == undefined) {
        name = 'seasmail';
    }
    return name;
};

let name = nameFromUrl(url);

fetch('https://api.github.com/users/' + name)
    .then(res => res.json())
    .then(json => {
        const avatar = json.avatar_url;
        const user = json.login;
        let description = json.bio;
        if (description == null) {
            description = 'Информация не доступна';
        }
        url = json.url;
        let createName = () => {
            let userName = document.createElement('h1');
            userName.innerHTML = user;
            body.appendChild(userName);
        };
        let createDescription = () => {
            let userDescription = document.createElement('h3');
            userDescription.innerHTML = description;
            body.appendChild(userDescription);
        };
        let createAvatar = () => {
            let userAvatar = document.createElement('img');
            let newString = document.createElement('br');
            userAvatar.src = avatar;
            body.appendChild(userAvatar);
            body.appendChild(newString);
        };
        let createUrl = () => {
            let userUrl = document.createElement('a');
            let text = document.createTextNode('profile');
            userUrl.appendChild(text);
            userUrl.href = 'https://github.com/' + name;
            body.appendChild(userUrl);
        };
        createName();
        createDescription();
        createAvatar();
        createUrl();
    })
    .catch(err => alert('Информация не доступна'));
