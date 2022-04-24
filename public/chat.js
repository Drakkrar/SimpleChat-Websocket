let socket = io();

// Query DOM
let message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

// Events
btn.addEventListener('click',function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value,
    });
    message.value = '';
});

message.addEventListener('keypress', function() {
    socket.emit('typing', handle.value);
})

// Listening
socket.on('chat', function({message, handle, id}){
    feedback.innerHTML = '';
    handle = handle ? handle : id;
    output.innerHTML += `<p><strong>${handle}:&rarr;</strong> ${message}</p>`
});

socket.on('typing', function({handle, id}){
    feedback.innerHTML = handle ? `<p><em>${handle} is typing a message...</em></p>` : `<p><em>${id} is typing a message...</em></p>`;
})