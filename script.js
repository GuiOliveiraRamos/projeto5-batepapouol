let username;

let objUsername;

function askUsername() {

    username = prompt("Digite o seu nome de usuário: ");
    console.log((username));

    objUsername = {

        name: `${username}`

    }

    const usernameServer = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ");

    usernameServer.then(loginSuccess);
    usernameServer.catch(loginFailed);

}

askUsername()


function loginSuccess(serverAnswer) {

    console.log(serverAnswer.data);

    let textName = document.querySelector('.container-mensagens ');
    for (let i = 0; i < serverAnswer.data.length - 1; i++) {


        let objUsername = serverAnswer.data[i];
        textName.innerHTML = textName.innerHTML + `
        <div class="info-mensagens">
        <p class="time">(09:21:45)</p>
        <p class="name">${username}</p>
        <p class="Message">Entrou na sala...</p>
        </div>
        `
    }

}

function loginFailed() {
    console.log("Login falhou");
}

loginSuccess();