var firstScreen = document.querySelector('#first-screen');
var scecondScreen = document.querySelector('#second-screen');
let msgBtn = document.querySelector('#sendmsg-btn');
var group = document.querySelector('#group-name-inp').value;

var userEntriesObjects = {};
var userEntriesArray = [];

userEntriesArray.push(userEntriesObjects);
localStorage.setItem('key', JSON.stringify(userEntriesArray));


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

function startTimer(duration, display) {
    var timer = duration,
        minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = seconds;

        if (--timer < 0) {
            //clearInterval(timer);
            //display.textContent ="00:00";

            logout();
        }

    }, 1000);
}

function tIMER() {
    var oneminute = 60 * 1,
        display = document.querySelector('#time');

    startTimer(oneminute, display);


};


function join() {
    var groupInp = document.querySelector('#group-name-inp').value;
    var nameInp = document.querySelector('#name-inp').value;

    let group = validategroupName(groupInp);
    let name = validateName(nameInp);

    console.log(group);
    console.log(name);
    if (!confirm("Are you sure ?")) {
        return
    } else {
        firstScreen.style.display = 'none';
        scecondScreen.style.display = "block";

        storeLocalStrorage(name);

    }
    tIMER();
}

function getMD5(body) {
    return CryptoJS.MD5(JSON.stringify(body));
}

function getAuthSignature(md5, timeStamp) {
    return CryptoJS.HmacSHA256(`POST\n/apps/1258784/events\nauth_key=b2d0db28cededf04656d&auth_timestamp=${timeStamp}&auth_version=1.0&body_md5=${md5}`, "c83118ee1cad8cf369f7");
}

let sendMessage = async function (message) {
    let body = {
        data: message,
        name: "my-event",
        channel: 'my-channel'
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

Pusher.logToConsole = true;

var pusher = new Pusher('b2d0db28cededf04656d', {
    cluster: 'ap2'
});

var channel = pusher.subscribe('my-channel');

channel.bind('my-event', function (data) {

    let newData = JSON.stringify(data);

    let node = document.createElement("p");
    node.innerHTML = ` User ${newData}  ${getTime()}`
    node.id = 'reciever';
    document.querySelector('#chat').appendChild(node);
});


function storeLocalStrorage(nameOfUser) {

    var userEntriesObjects = {
        id: '_' + Math.random().toString(36).substr(2, 9),
        nameInArray: nameOfUser
    };
    var userEntriesArray = [];



    if (localStorage.getItem("key") === null) {
        userEntriesArray = [];
    } else {

        userEntriesArray.push(userEntriesObjects);
        localStorage.setItem('key', JSON.stringify(userEntriesArray));
    }


    console.log(localStorage.getItem("key"));

    // to store the data after the reload
    // const info = JSON.parse(localStorage.getItem('key'));
    // var dataStored = info.map(({
    //     id
    // }) => id);

}

function logout() {
    firstScreen.style.display = 'block';
    scecondScreen.style.display = "none";
    localStorage.removeItem("key");
    UnsubToPusherChannel();
}

function UnsubToPusherChannel() {

    pusher.unsubscribe('my-channel');
}

document.addEventListener('keypress', function (event) {

    if (event.keyCode == 13) {
        sendTheMsg();
    }
})

sendTheMsg = function () {
    //message to be sent to pusher
    let message = document.querySelector('#sendmsg-inp').value;

    if (message === null || message.length === 0 || message.replace(/^\s+|\s+$/gm, '') == "") {
        //  channel.unbind(eventName, callback);
        alert('your text area is empty');

        return;
    }


    sendMessage(message);



    let node = document.createElement("p");
    let textnode = document.createTextNode('you : ' + message + '       ' + getTime());
    node.appendChild(textnode);
    node.id = 'sender';
    document.querySelector('#chat').appendChild(node);

}

function getTime() {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time
}