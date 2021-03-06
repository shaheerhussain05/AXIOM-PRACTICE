// Get DOM Elements
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const selectMovie = document.getElementById('movie');

// Get the ticket price from the selectMovie dropdown
let ticketPrice  = +selectMovie.value;



// Call the update UI function - get data from local storage and update the UI
updateUI();



// Function to update counts
function updateCount() {
    // Calculate how many seats are selected
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // Create an array using the node list
    const seatIndex = [...selectedSeats].map( seat => [...seats].indexOf(seat) );
    // Get the number of seats from the node list
    const selectedSeatsCount = selectedSeats.length;
    // Update DOM with the count
    count.innerText = selectedSeatsCount;
    // Update DOM with total price
    total.innerText = selectedSeatsCount * ticketPrice;
    // Save data to local storage
    localStorage.setItem('selectedSeats',JSON.stringify(seatIndex));
};

// function to save the selected movie data in local storage
function saveMovieData(movieIndex, moviePrice) {
    localStorage.setItem('movieIndex', movieIndex);
    localStorage.setItem('moviePrice', moviePrice);
};

// Function to get data from local storage and update the UI
function updateUI() {
    // Get the selectd seats data from local storage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    // check if there is any selected seats
   if ( selectedSeats !== null && selectedSeats.length > 0 ) {
    // Loop over all the seats in the theater  
    seats.forEach( (seat, index) => {
        // if the index of seat is contained inside selectedSeats array
        if ( selectedSeats.indexOf(index) > -1 ) {
            // add the selected class to the seat
            seat.classList.add('selected');
        }
    })
}

    // Get the selected movie from local storage
    const movieIndex = localStorage.getItem('movieIndex');
    // Check if there is a movie index 
    if (movieIndex !== null ) {
        //Use the movieindex from the local storage to update the movie from dropdown
        selectMovie.selectedIndex = movieIndex;
    }
     // Update the counts
     updateCount();

};

// Event Listeners
// 1.Listen for click on container
container.addEventListener('click', e => {
    // Check if target has a class of seat and also is not occupied
    if ( e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        // Add or remove the selected seats on click
        e.target.classList.toggle('selected');
        // Update the count of selected seats
        updateCount();
    }
}) 


// 2. listen for change in movie selectiion
selectMovie.addEventListener('change', e => {
    // Update ticket price for the selected movie
    ticketPrice = e.target.value;
    // update the count in the DOM
    updateCount();

    // Save the movie data to the local storage
    saveMovieData(e.target.selectedIndex, e.target.value);
})
