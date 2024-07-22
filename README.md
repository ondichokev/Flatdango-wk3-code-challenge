
## Features

- View the details of the first movie when the page loads
- View a list of all available movies
- Purchase tickets for a movie
- Indicate when a movie is sold out

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/flatdango.git
    ```
2. Navigate to the project folder:
    ```bash
    cd flatdango
    ```
3. Install JSON server:
    ```bash
    npm install -g json-server
    ```
4. Start the JSON server:
    ```bash
    json-server --watch db.json
    ```
5. Open `index.html` in your browser.

## Usage

- Click on a movie title in the list to view its details.
- Click the "Buy Ticket" button to purchase a ticket.
- The number of available tickets will decrease accordingly.
- When no tickets are available, the button will indicate "Sold Out".

## Additional Features

- Click the delete button next to a movie to remove it from the list.
