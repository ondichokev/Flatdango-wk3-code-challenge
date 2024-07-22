document.addEventListener('DOMContentLoaded', () => {
    const filmsList = document.getElementById('films');
    const movieDetails = document.getElementById('movie-details');
    const movieTitle = document.getElementById('movie-title');
    const moviePoster = document.getElementById('movie-poster');
    const movieRuntime = document.getElementById('movie-runtime');
    const movieShowtime = document.getElementById('movie-showtime');
    const movieDescription = document.getElementById('movie-description');
    const availableTickets = document.getElementById('available-tickets');
    const buyTicketButton = document.getElementById('buy-ticket');
    
    let currentMovie;

    fetch('http://localhost:3000/films/1')
        .then(response => response.json())
        .then(movie => displayMovieDetails(movie));

    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(movies => {
            movies.forEach(movie => {
                const li = document.createElement('li');
                li.textContent = movie.title;
                li.classList.add('film', 'item');
                li.addEventListener('click', () => displayMovieDetails(movie));

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', (event) => {
                    event.stopPropagation();
                    deleteMovie(movie.id, li);
                });
                li.appendChild(deleteButton);

                filmsList.appendChild(li);
            });
        });

    
    function displayMovieDetails(movie) {
        currentMovie = movie;
        movieTitle.textContent = movie.title;
        moviePoster.src = movie.poster;
        movieRuntime.textContent = `${movie.runtime} minutes`;
        movieShowtime.textContent = movie.showtime;
        movieDescription.textContent = movie.description;
        updateAvailableTickets();
    }

    
    function updateAvailableTickets() {
        const available = currentMovie.capacity - currentMovie.tickets_sold;
        availableTickets.textContent = available;
        buyTicketButton.textContent = available === 0 ? 'Sold Out' : 'Buy Ticket';
        buyTicketButton.disabled = available === 0;
    }

   
    buyTicketButton.addEventListener('click', () => {
        if (currentMovie.capacity - currentMovie.tickets_sold > 0) {
            currentMovie.tickets_sold++;
            updateAvailableTickets();
            updateTicketsSoldOnServer(currentMovie.id, currentMovie.tickets_sold);
        }
    });

    
    function updateTicketsSoldOnServer(id, ticketsSold) {
        fetch(`http://localhost:3000/films/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tickets_sold: ticketsSold })
        });
    }

    
    function deleteMovie(id, movieElement) {
        fetch(`http://localhost:3000/films/${id}`, {
            method: 'DELETE'
        }).then(() => movieElement.remove());
    }
});
