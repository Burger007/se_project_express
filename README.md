This is the back end for my WTWR app. I built it with Node.js and Express,
and the data (users and clothing items) is stored in MongoDB. I used Mongoose
to set up the schemas and models, and the validator package to make sure the
avatar and image links are real URLs.

To keep the code clean, I set up ESLint with the Airbnb style guide, plus
Prettier for formatting. Nodemon restarts the server every time I save a
file, which made working on it a lot faster.

For testing I used Postman and GitHub Actions.

What it does

- You can get all users, get one user by ID, and create a new user.
- You can get all clothing items, add a new one, and delete one.
- You can like and unlike items.
- If something goes wrong, the server sends back an error with the right status
  code (400 for bad data, 404 if something isn’t found, 500 for server errors)
- Going to a route that doesn’t exist returns “Requested resource not found”
