# Calorie Tracker

A calorie tracker app built using the MERN stack.

- It utilizes a public food database API and a rest API to fetch individual food items
  along with their measurements and caloric plus nutritional values.
- The rest API is built using node and express and hosted on herokuapp. It is protected
  by CORS and can only be accessed from the github pages deployment.
- Users can register and their information will be stored inside of a MongoDB cluster
  where the password will be encrypted and decrypted upon login, this was achieved using
  Bcryptjs and JWT.
- Users can create meal plans in which they can store, update, delete fetched items
  in addition to keeping track of their measurements and total caloric value from all
  of the items in the plan. All of this data is also stored in MongoDB.
- The front end is standard react boilerplate with a custom responsive
  design for smaller screens all designed with vanilla CSS.
- The front end makes fetch requests utilizing the axios package.

- API used: https://developer.edamam.com/food-database-api-docs

- App Created by Kristupas Jusas (Chrisgth)
