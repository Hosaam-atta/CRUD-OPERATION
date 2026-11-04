const express =  require("express");
const app = express();
require("dotenv").config();

app.use(express.json()) 
const CoursesRouter = require('./Router/router.courses');

app.use('/api/Courses' , CoursesRouter)

app.listen(3000, ()=>{
    console.log("Done Lisen");
     
})