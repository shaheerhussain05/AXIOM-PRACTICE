// Get Dom elements
const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const time = document.getElementById('time');

// Function to play or pause video
function playPauseVideo() {
    // Check if video is paused or playing
    if ( video.paused ) {
        // if video is paused, play the video
        video.play();
    } else {
        // if video is playing, pause the video
        video.pause();
    }
};


// Function to update the play / pause icons
function updateIcons() {
    // Check if video is paused or playing
    if ( video.paused ) {
        // If video is paused show the play button
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    } else {
        // if video is playing show the pause button 
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
    }
};

// Function to update the video progress
function updateProgress() {
    // Update the value of progress bar using current time / total time
    progress.value = (video.currentTime / video.duration) * 100;
    // Use current time to calculate minutes
    let minutes = Math.floor(video.currentTime / 60)
    // format minutes to always be 2 digits
    if ( minutes < 10 ) {
        minutes = '0' + String(minutes);
    }
    // Use current time to calculate seconds
    let seconds = Math.floor(video.currentTime % 60)
    // format seconds to always be 2 digits
    if ( seconds < 10 ) {
        seconds = '0' + String(seconds);
    }
    // Update the time in the UI
    time.innerHTML = `${minutes}:${seconds}`;
}
// Function to update the video playback
function stopVideo() {
    // Reset the video time to 0
    video.currentTime = 0,
    video.pause();
};

// Function to update the video progress based on progress bar change
function updateVideoProgress() {
    // set the current time of video based on position of slider 
    video.currentTime = (progress.value * video.duration) / 100;

};


// Event listeners
// 1. Listen for click on video element
video.addEventListener('click', playPauseVideo);
// 2. Listen for pause event on video element
video.addEventListener('pause', updateIcons);
// 3. Listen for play event on video element
video.addEventListener('play', updateIcons);
// 4. Listen for timeUpdate event on video element
video.addEventListener('timeupdate', updateProgress);
// 5. Listen for click event on play button
play.addEventListener('click', playPauseVideo);
// 6. Listen for click on stop button
stop.addEventListener('click', stopVideo);
// 7. listen for change event on progress bar 
progress.addEventListener('change', updateVideoProgress);