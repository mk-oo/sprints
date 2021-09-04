var firstScreen = document.querySelector('#first-screen');
var scecondScreen = document.querySelector('#second-screen');
let msgBtn = document.querySelector('#sendmsg-btn');
var group = document.querySelector('#group-name-inp').value;
var user = 0.1;
var userEntriesObjects = {};
var userEntriesArray = [];
//userEntriesArray.push(userEntriesObjects);
//localStorage.setItem('key', JSON.stringify(userEntriesArray));
var event = 'my-event'
var room = 'my-channel'
var name = "";


// function startTimer(duration, display) {
//     var timer = duration,
//         minutes, seconds;
//     setInterval(function () {
//         minutes = parseInt(timer / 60, 10);
//         seconds = parseInt(timer % 60, 10);

//         seconds = seconds < 10 ? "0" + seconds : seconds;

//         display.textContent = seconds;

//         if (--timer < 0) {
//             //clearInterval(timer);
//             //display.textContent ="00:00";

//             logout();
//         }

//     }, 1000);
// }

// function tIMER() {
//     var oneminute = 60 * 1,
//         display = document.querySelector('#time');

//     startTimer(oneminute, display);


// };




function join() {
    var groupInp = document.querySelector('#group-name-inp').value;
    var nameInp = document.querySelector('#name-inp').value;
    let group = validategroupName(groupInp);
    let name = validateName(nameInp);

    console.log(group);
    console.log(name);
    user = getGUID();

    if (!confirm("Are you sure ?")) {
        return
    } else {
        firstScreen.style.display = 'none';
        scecondScreen.style.display = "block";
    }
    
    storeLocalStrorage(name,user,group);
    subscribeToPusher(groupInp, user);
    tIMER();
}
function storeLocalStrorage(nameOfUser,idOfUser,group) {
    let div = document.querySelector('#online-users');


    var userEntriesObjects = {
        id: idOfUser,
        nameInArray: nameOfUser
    };
    var userEntriesArray = [];
    if (localStorage.getItem("key") === null) {
        userEntriesArray = [];
    } else {
        userEntriesArray = JSON.parse(localStorage.getItem("key"));
    }
    userEntriesArray.push(userEntriesObjects);
    localStorage.setItem('key', JSON.stringify(userEntriesArray));


    // get online user count
    onlineMembers = JSON.parse(localStorage.getItem('key')).length;
    console.log(onlineMembers);

    div.innerHTML = `${group}: Online Users (${onlineMembers}) `;
    
}

let subscribeToPusher = async function (room, user) {
    Pusher.logToConsole = true;

    var pusher = new Pusher('b2d0db28cededf04656d', {
        cluster: 'ap2'
    });
    var channel = pusher.subscribe(room);
    recievedMesage(channel, user)
}


function startTimer(duration, display) {
    var timer = duration,
        minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = seconds;

        if (--timer < 0) {

            logout();
        }
    }, 1000);
}

function tIMER() {
    var oneminute = 60 * 1;
    display = document.querySelector('#time');
    startTimer(oneminute, display);
};




recievedMesage = async function (channel, user) {
    channel.bind('my-event', function (data) {
        respond = JSON.parse(JSON.stringify(data));
        message = respond.message;
        senderId = respond.userId;
        addedMsg = document.querySelector('#chat');

        if (user == senderId) {
            addedMsg.insertAdjacentHTML("beforeend", `<p id= 'sender'> You: ${message}</p>`)
        }
        if (user != senderId) {
            addedMsg.insertAdjacentHTML("beforeend", `<p id ='reciever'>User: ${message}</p>`)
        }


    });
}
async function sendMessage() {
    console.log('Send Button Clicked')
    message = document.querySelector('#sendmsg-inp').value;
    document.querySelector('#sendmsg-inp').value = "";

    if (message === null || message.length === 0 || message.replace(/^\s+|\s+$/gm, '') == "") {
        alert('your text area is empty');
        return;
    }
    pusherAPI(message);
}

async function pusherAPI(message) {

    let body = {
        data: '{"message":"' + message + '","userName":"' + name + '","userId":"' + user + '"}',
        name: "my-event",
        channel: room
    }
    let timeStamp = Date.now() / 1000;
    let md5 = getMD5(body);
    let url = `https://cors.bridged.cc/https://api-ap2.pusher.com/apps/1258784/events?body_md5=${md5}&auth_version=1.0&auth_key=b2d0db28cededf04656d&auth_timestamp=${timeStamp}&auth_signature=${getAuthSignature(md5,timeStamp)}`;
    let req = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
function validateName(name) {
    if (name === null || name.length === 0 || name.replace(/^\s+|\s+$/gm, '') == "" || Boolean(name) === false) {
        alert('enter your name');

    } else {
        return name;
    }
}

function validategroupName(groupNam) {
    if (groupNam === null || groupNam.length === 0 || groupNam.replace(/^\s+|\s+$/gm, '') == "" || Boolean(groupNam) === false) {
        alert('enter your group name');

    } else {
        return groupNam;
    }
}

function getMD5(body) {
    return CryptoJS.MD5(JSON.stringify(body));
}

function getAuthSignature(md5, timeStamp) {
    return CryptoJS.HmacSHA256(`POST\n/apps/1258784/events\nauth_key=b2d0db28cededf04656d&auth_timestamp=${timeStamp}&auth_version=1.0&body_md5=${md5}`, "c83118ee1cad8cf369f7");
}

function getGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function getTime() {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time
}

function logout() {
    firstScreen.style.display = 'block';
    scecondScreen.style.display = "none";
    localStorage.removeItem("key");
}
document.addEventListener('keypress', function (event) {

    if (event.keyCode == 13) {
        sendMessage();
    }
})