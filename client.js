const socket = io('http://localhost:8000')


const form = document.getElementById('send-container')
const messageinput = document.getElementById('messageinp')
const messagecontainer = document.querySelector('.container')

var audio = new Audio('ting.mp3');

const append = (message, position) => {
    const messagevent = document.createElement('div')
    messagevent.innerText = message;
    messagevent.classList.add('message')
    messagevent.classList.add(position)
    messagecontainer.append(messagevent)

    if (position == 'right') {
        audio.play();
    }
}


const Name = prompt("enter your name to join")
socket.emit('new-user-joined', Name)


socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})


socket.on('receive', data => {
    append(`${data.user} :${data.message}`, 'left')
})
socket.on('left', name => {
    append(`${name} joined the chat`, 'right')
})
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageinput.value;
    append(`you:${message}`, 'right')
    socket.emit('send', message)
    messageinput.value = ' ';
})