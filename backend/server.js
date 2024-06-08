const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRouter = require("./routes/user");
const bookRouter = require("./routes/book");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 8081;
const app = express();
//const allowedOrigins = ['https://u08.netlify.app', 'https://main--u08.netlify.app'];

app.use(cookieParser());
app.use(express.json());

 app.use(
   cors({
     origin: process.env.REQUEST_URL,
   
     credentials: true,
   })
 );
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true // This is important for including cookies in requests
// };

//app.use(cors(corsOptions));



app.use("/user", userRouter);
app.use("/book", bookRouter);
app.use("/uploads", express.static("./uploads"));

app.get("/", (req, res) => {
  return res.json({ message: "Welcome to my bookShare app" });
});

const startServer = (port) => {
  try {
    app.listen(port, () => {
      console.log(`Server up and running on port ${port}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error}`);
    process.exit(1);
  }
};

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
  startServer(PORT);
})
.catch((error) => {
  console.error(`Failed to connect to MongoDB: ${error}`);
  process.exit(1);
});
