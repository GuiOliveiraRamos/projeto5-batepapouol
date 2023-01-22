let username;

let objUsername;

const inputText = document.querySelector("footer input");

let chat = document.querySelector(".container-mensagens")

function askUsername() {

    username = prompt("Digite o seu nome de usuário: ");
    console.log((username));

    objUsername = {

        name: `${username}`

    }

    const usernameServer = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", objUsername);

    usernameServer.then(loginSuccess);
    usernameServer.catch(loginFailed);

}

askUsername()


function loginSuccess(serverAnswer) {

    let textName = document.querySelector('.container-mensagens ');
    for (let i = 0; i < serverAnswer.data.length - 1; i++) {

        textName.innerHTML = textName.innerHTML + `
        <div class="status">
        <p class="time">(09:21:45)</p>
        <p class="name">${username}</p>
        <p class="Message">Entrou na sala...</p>
        </div>
        `
    }

}

function loginFailed() {
    console.log("Login falhou");
    location.reload();
}


function stayOnline() {

    const verifyStatus = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", objUsername)


    console.log("está conectado")
    verifyStatus.then();
    verifyStatus.catch();

}

setInterval(stayOnline, 5000);


function serverMessage() {

    const messageServer = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')

    messageServer.then(getMessage)
    messageServer.catch(reload)

}

setInterval(serverMessage, 3000)


function reload() {
    location.reload();
}



function getMessage(answer) {

    let chat = document.querySelector('.container-mensagens');
    chat.innerHTML = '';


    for (let i = 0; i < 100; i++) {

        let hour = answer.data[i].time;
        let name1 = answer.data[i].from;
        let name2 = answer.data[i].to;
        let text = answer.data[i].text;
        let type = answer.data[i].type;

        if (type === 'message') {

            chat.innerHTML += `

        <div class="${type}">
        <p class="time">(${hour})</p>
        <p class="name">${name1}</p>
        <p>para</p>
        <p class="name1">${name2}:</p>
        <p class="mensagem">${text}</p>
        </div>
       `
        }

    }

}


function sendMessage() {

    const messageBody = {

        from: username,
        to: "Todos",
        text: inputText.value,
        type: "message"

    }

    const send = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', messageBody)

    inputText.value = "";

    send.then(serverMessage);
    send.catch(reload);

}