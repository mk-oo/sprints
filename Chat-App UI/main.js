var firstScreen = document.querySelector('#first-screen');
var scecondScreen = document.querySelector('#second-screen');

var groupNam = document.querySelector('#group-name-inp');
var Name = document.querySelector('#name-inp');


function validateName(){
    if(Name === '' ||  Name.replace(/^\s+|\s+$/gm,'')=== ""  || Name === null){
        alert('Enter your name');
    }
    else{
        return Name
    }

}
function getName(){
    /// name to  get
}


// Timer to logout
// function startTimer(duration, display) {
//     var timer = duration, minutes, seconds;
//     setInterval(function () {
//         minutes = parseInt(timer / 60, 10);
//         seconds = parseInt(timer % 60, 10);

//         seconds = seconds < 10 ? "0" + seconds : seconds;

//         display.textContent =  seconds;

//         if (--timer < 0) {
//             logout();
//         }
 

//     }, 1000);
// }

// window.onload = function () {
//     var oneminute = 60 * 1,
//         display = document.querySelector('#time');
//     startTimer(oneminute, display);
// };




function join() {

    firstScreen.style.display = 'none';
    scecondScreen.style.display = "block";

   // subToPusherChannel();
}

function subToPusherChannel() {

    console.log('logged in');
    // var Pusher =  {
    //     **init pusher**

    // }
}

function storeLocalStrorage(){

    console.log('local storage');
}

function logout() {
    firstScreen.style.display = 'block';
    scecondScreen.style.display = "none";

    //UnsubToPusherChannel();
}
function UnsubToPusherChannel(){

    console.log('unsubscribed from the channel and the local storage is empty');
}

// msg send button
let msgBtn = document.querySelector('#sendmsg-btn');


// Enter key to add task
document.addEventListener('keypress',function(event){

    if(event.keyCode == 13){
      sendTheMsg();
    }
  })
  
sendTheMsg = function () {
    console.log('Message sent');

    getDateandTime();
}

function getDateandTime() {
    console.log('Date and time to be sent');
}
msgBtn.addEventListener('click', sendTheMsg);
