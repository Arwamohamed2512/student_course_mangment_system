const express = require("express")
const dotenv=require("dotenv")
dotenv.config({path:"./config.env"})
const app = express();

app.use(express.json());


const port = process.env.port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});