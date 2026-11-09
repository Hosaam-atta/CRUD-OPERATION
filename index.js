const express =  require("express");
const app = express();
require("dotenv").config();
const httpstatus = require("./utils/httpstatus")
const corse = require("cors")
const path = require("path")

app.use(express.json()) 
const CoursesRouter = require('./Router/router.courses');
const usersRouter = require('./Router/router.users')
app.use(corse()); // open the blocked connectio between back and fron end



app.use("/upload" , express.static(path.join(__dirname , "/upload")))
app.use('/api/Courses' , CoursesRouter)
app.use('/api/users' , usersRouter )
    

//  global  middlewares for handle route
app.all( "/{*any}" , (req ,res)=>{
   return res.status(404).json({status:httpstatus.Error ,  mass:"Source Is Not Avilabel" })
})
 
// global middleweare handdle Error
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: "error",
        message: error.message
    });
});

app.listen(3000, ()=>{
    console.log("Done Lisen");  
     
})