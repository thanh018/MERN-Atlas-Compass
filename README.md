--- Install ---

--- 1. cd backend ---
- npm install express cors mongoose dotenv
- npm install nodemon --save-dev
- npm install formidable@latest
- nodemon server


--- 2. cd MERN-Atlas-Compass ---

- npm install
- npm start


--- 3. MongoDB ---

----- 3.1. MongoDB Compass:

 - mongoose.connect('mongodb://localhost:27017/reactApp', { useNewUrlParser: true, useCreateIndex: true } );

----- 3.2. MongoDB Atlas: New project -> Cluster -> Copy link

 - ATLAS_URI=mongodb+srv://thanh:12345678a@@cluster0.q3iaq.gcp.mongodb.net/testDB?retryWrites=true&w=majority
