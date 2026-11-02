const bodyParser = require("body-parser");
const express =  require("express");
const { log } = require("node:console");
const { json } = require("node:stream/consumers");
const app=express();


const Courses = [ 
    { 
        id:1,
        title:"Html",
        price:"250"
    },
    { 
        id:2,
        title:"Css",
        price:"350"
    },
    { 
        id:3,
        title:"Js",
        price:"650"
    },
]


app.use(express.json())  
// app.use(bodyParser.json())
const {body , validationResult, param} = require("express-validator")


//  CRUD (create , read , update , delet ) operation 

// get  all cources
app.get('/api/Courses' ,(req ,res)=>{
    res.json(Courses)
})

// get  single  courses
app.get('/api/Courses/:CourseId' , 
    (req ,res)=>{
    const CoursesId = +req.params.CourseId;
    const course = Courses.find((co)=> co.id === CoursesId );

    if (!course) {

        return res.status(404).json({mas:"Cources Nout Found"})      
    }
    res.json(course);
    res.end();
})

//  Create new course
app.post('/api/Courses' ,
         
    [
        body("title")
          .notEmpty()
          .withMessage("Title is Require") 
          .isLength({min:"2"}).withMessage("MIn Size is 2 char") ,

        body("price")
           .notEmpty().withMessage("Price is reqire")
           .isLength({min:"3"}).withMessage("MIn Size is 3 num") 
    ]
    
    ,(req ,res)=>{
    console.log(req.body);


    // validation  
    // if(!req.body.title)
    // {
    //     return res.status(400).json({mass:"Title is provide"})
    // }
    //  if(!req.body.price)
    // {
    //     return res.status(400).json({mass:"price is provide"})
    // }

       const errors = validationResult(req);
       if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
       }

    const corse = {id:Courses.length +1 ,
        title:req.body.title,
        price:req.body.price,
    }
    Courses.push(corse)


    res.status(201).json(corse);
} )


   //  update on course
app.patch('/api/Courses/:CourseId' , (req , res)=>{
    const CoursesId = +req.params.CourseId;
     const course = Courses.find((co)=> co.id === CoursesId );

    if (!course) {
        return res.status(404).json({mas:"Cources Nout Found"})      
    }

    const courses = {...course , ...req.body}  //  merge between  details course  and the update data git from  req.body
    res.json(courses)
    res.end();

} )

  //  Delet Cource 
app.delete('/api/Courses/:CourseId' , (req , res )=>{
    const CoursesId = +req.params.CourseId;
    if(!CoursesId)
    {
        res.json({mass:"Not Found"})
    }

    const course = Courses.filter((co)=> co.id != CoursesId );

    

    
    res.json(course)

})


app.listen(3000, ()=>{
    console.log("Done Lisen");
     
})