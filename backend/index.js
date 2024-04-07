const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/index");
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use('/api/v1', router)

app.listen(PORT,()=>{
  console.log(`server running at port ${PORT}`);
})