const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user");
const productRoutes = require("./routes/product");
const purchaseHistoryRoutes = require("./routes/purchaseHistory");
const cors = require('./middleware/cors');



const app = express();
const port = process.env.PORT || 9000;

app.use(cors);
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", productRoutes);
app.use("/api", purchaseHistoryRoutes);



app.get("/", (req, res) => {
  res.send("Welcome to my API");
});


mongoose
  .connect(process.env.MONGOUri)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));


app.listen(port, () => console.log("Server listening to", port));
