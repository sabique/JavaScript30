let countdownHandle;

const countdownTime = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const timers = document.querySelectorAll('.timer__button');

function timer(seconds) {
    const startTime = Date.now();
    const endTime = startTime + seconds * 1000;
    clearInterval(countdownHandle);

    displayTimeLeft(seconds);
    displayRemainingTime(endTime);

    countdownHandle = setInterval(function(){
    const secondsLeft = Math.round((endTime - Date.now()) / 1000);
    
    if(secondsLeft < 0) {
        clearInterval(countdownHandle);
        return;
    }
    displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds/60);
    const remainderSeconds = (seconds % 60);

    const display = `${minutes < 10?'0':''}${minutes}:${remainderSeconds < 10? '0' : ''}${remainderSeconds}`;
    document.title = display;
    countdownTime.textContent = display;
}

function displayRemainingTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    const formattedHour = (hours < 13)? hours : hours - 12;
    const meridian = (hours < 13)? 'AM' : 'PM';

    endTime.textContent = `Be Back At ${formattedHour}:${minutes < 10? '0' : ''}${minutes} ${meridian}`;
}

function startTimer(){
    var seconds = parseInt(this.dataset.time);
    timer(seconds);
}

timers.forEach(t => t.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const minutes = this.minutes.value;
    timer(minutes * 60);
    this.reset();
})