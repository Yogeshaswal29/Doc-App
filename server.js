const express = require("express");
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB =require("./config/db");

//dotenv conig
dotenv.config();
 
//mongodb connection
connectDB();

//rest obejct
const app = express();
var cors = require('cors')

//middlewares
app.use(express.json());
app.use(moragan("dev"));
app.use(cors());

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));


app.get("/",(req,res)=>{
    res.status(200).send({
        message:"Server running",
    });
});

// ---------------------production ---------------------
if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }
// --------------------production ------------------------

//port
const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
