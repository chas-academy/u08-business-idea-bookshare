### BookShare Project Overview

This project was completed solely by me as part of my Fullstack Web Developer class at Chas Academy. The aim was to develop an app that allows users to find books to borrow and lend their own books to others.

#### Technologies Used
- **Frontend**: React
- **Backend**: Node.js/Express
- **Database**: MongoDB

Final result: [BookShare]()

### Installation

The tools used for this project include VSCode, Figma, Git, and GitHub. Follow these steps to set up the project:

1. **Clone the GitHub project**:
   ```sh
   git clone <repository-url>
   ```

2. **Start the Backend**:
   ```sh
   cd backend
   npm install
   npm run start
   ```

3. **Start the Chat Functionality**:
   ```sh
   cd ../socket
   npm install
   npm run start
   ```

4. **Start the Frontend**:
   ```sh
   cd ../frontend
   npm install
   npm run start
   ```

5. **Access the Application**:
   - Frontend: [localhost:3000](http://localhost:3000)
   - Backend: [localhost:8081](http://localhost:8081)

### Node.js and MongoDB

The backend uses Express.js and MongoDB. To get started, navigate to the backend folder and install dependencies:

```sh
cd backend
npm install
npm run start
```

### React App

The frontend is built with React. Set up the frontend by navigating to the frontend folder and installing dependencies:

```sh
cd frontend
npm install
npm start
```

### Cypress Testing

To set up Cypress for testing:

1. **Install Cypress**:
   ```sh
   npm install cypress --save-dev
   ```

2. **Open Cypress**:
   ```sh
   npm run cypress:open
   ```

Cypress configuration (`cypress.config.js`):
```js
module.exports = {
  baseUrl: "http://localhost:3000",
  apiUrl: "http://localhost:8080",
};
```

### Backend Routes

#### book.js
- **Create**: Add a new book to the database.
- **Get User Books**: Retrieve books belonging to the logged-in user.
- **Get Books**: Retrieve all books from the database.
- **Get Single Book**: Retrieve a book by its ID.
- **Update Book**: Update a book's information.
- **Delete Book**: Remove a book from the database.
- **Search Books**: Filter books based on search terms, city, and genre.

#### conversations.js
- **Post**: Create a new private chat between two users.
- **Get**: Fetch a conversation by its ID.

#### messages.js
- **Post**: Send a message to a specific conversation.
- **Get**: Fetch all messages from a specific conversation.

#### user.js
- **Authorization**: Authenticate a user.
- **Login**: Authenticate user credentials and set an access token.
- **Protected**: Access protected routes by validating the user token.
- **Register**: Register a new user.
- **Logout**: Remove the access token to log out the user.
- **Delete**: Delete a user by ID.
- **Edit**: Update user information by ID.
- **Reset Password**: Reset a user's password.
- **Get**: Retrieve a user's first name for display purposes.

### Socket.io

A server for sending and receiving private chat messages between users.

### Frontend Components

#### addbook
- Form for users to add their own books to the database.

#### bookpage
- Displays book details dynamically based on the URL parameter.

#### dashboard
- Displays user information and books when a valid JWT token is present.

#### edit
- Allows users to update their personal information.

#### editbook
- Allows users to update their book information.

#### footer
- Contains copyright information and links to social media and GitHub accounts.

#### home
- Landing page with information about the app and links to register, login, and browse books.

#### login
- Authenticates user credentials and navigates to the dashboard on success.

#### messenger
- **Conversation**: Retrieves conversations based on ID.
- **Message**: Fetches or posts messages in a conversation.
- **Messenger**: UI for the chat app.

#### registration
- Registers a new user by submitting form data to the backend.

#### search
- Searches for books by title or author, with additional filters for location and genre.

#### App.js
- Contains all routes to the components and the navbar.

### Future Features
- Connect the app to an external API to fetch more books.
- Add a queue function for users to wait for book availability.
- Implement rating and commenting for books and users.

### Testing
- **Happy User Flow**: Register and log in a user successfully for testing purposes.



**Chat functionality** includes both backend (Express.js, Mongoose, and Socket.io) and frontend (React) components. Here's a detailed explanation of how they work together:
1. **Conversation and Message Schemas**:
    - These define the data structures for conversations and messages in your MongoDB database.
2. **Socket.io Server Setup**:
    - This sets up the Socket.io server to handle real-time communication.
3. **User Model**:
    - Import the user model, which is necessary for user-related operations.

#### Frontend
1. **ChatOnline Component**:
    - Displays online users.

2. **Conversation Component**:
    - Displays a single conversation with another user.
3. **Message Component**:
    - Displays individual messages.
4. **Messenger Component**:
    - Main chat component that integrates conversations and messages.

### How it Works

1. **Establish Connection**:
    - When the user logs in, they are added to the Socket.io server.
    - The `addUser` event stores the user ID and their Socket.io connection ID in the `users` array.

2. **Sending Messages**:
    - When a user sends a message, the `sendMessage` event is triggered.
    - The message details (sender, receiver, and text) are emitted to the server.
    - The server retrieves the receiver’s socket ID and emits the `getMessage` event to that socket, delivering the message in real-time.

3. **Receiving Messages**:
    - When the client receives a `getMessage` event, it updates the chat interface with the new message if the current chat matches the sender.

4. **Fetching Conversations and Messages**:
    - The frontend fetches the user’s conversations and messages using Axios to make API calls to the backend.
    - When a conversation is selected, messages are fetched and displayed in the chat interface.

5. **Real-Time Updates**:
    - The chat interface updates in real-time as new messages arrive, ensuring a seamless chatting experience.

This setup provides a robust real-time chat functionality with real-time message delivery, dynamic user updates, and integration with the existing backend and frontend systems.


