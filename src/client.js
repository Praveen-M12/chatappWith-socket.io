const socket = io();
let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');
let sendButton = document.getElementById('sendButton'); // Added this line to select the send button element

do {
    name = prompt('Please enter your name: ');
} while (!name);

// sendButton.addEventListener('click', () => { 
//     if (textarea.value.trim() !== '') {
//         sendMessage(textarea.value);
//     }
// });

textarea.addEventListener('keyup', (e) => {
    //not send mesage if we not add the data
    if (e.key === 'Enter' && textarea.value.trim() !== '') { 
        sendMessage(textarea.value);
    }
});

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    };

    // Append 
    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom();

    // Send to server 
    socket.emit('message', msg);
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
});

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}


