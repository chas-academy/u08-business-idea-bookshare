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
   git clone <https://github.com/chas-academy/u08-business-idea-bookshare.git>
   ```

2. **Start the Backend**:
### Node.js and MongoDB

The backend uses Express.js and MongoDB. To get started, navigate to the backend folder and install dependencies:
   ```sh
   cd backend
   npm install
   npm run start
   ```



3. **Start the Frontend**:
### React App

The frontend is built with React. Set up the frontend by navigating to the frontend folder and installing dependencies:

   ```sh
   cd ../frontend
   npm install
   npm run start
   ```

4. **Access the Application**:
   - Frontend: [localhost:3000](http://localhost:3000)
   - Backend: [localhost:8081](http://localhost:8081)



### Backend Routes

#### book.js
- **Create**: Add a new book to the database.
- **Get User Books**: Retrieve books belonging to the logged-in user.
- **Get Books**: Retrieve all books from the database.
- **Get Single Book**: Retrieve a book by its ID.
- **Update Book**: Update a book's information.
- **Delete Book**: Remove a book from the database.
- **Search Books**: Filter books based on search terms, city, and genre.



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

.

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





