const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect(process.env.MONGO)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));



app.get("/", (req, res) => {
    res.send("Hello World!")
});

app.use("/user", require("./routes/user.routes"));
app.use("/product", require("./routes/product.routes"));
app.use("/cart", require("./routes/cart.routes"));


app.listen(3000, () => {
    console.log('Server is running on port 3000');
    });