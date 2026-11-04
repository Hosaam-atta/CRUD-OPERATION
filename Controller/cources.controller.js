const {body , validationResult, param} = require("express-validator")
let {Courses} = require('../data/Cources')
const pool = require('../database/dp')


const GetAllCourses = async (req ,res)=>{
     const result = await pool.query("SELECT * FROM COURSE");
    res.json(result.rows)
}

const GetSingleCourse = async (req ,res)=>{
    const CoursesId = +req.params.CourseId;
    // const course = Courses.find((co)=> co.id === CoursesId );
    const result = await pool.query(
    "SELECT id, title, price FROM course WHERE id = $1",
    [CoursesId]
);

    // if (!result) {

    //     return res.status(404).json({mas:"Cources Nout Found"})      
    // }
    
    res.json(result.rows);
    res.end();
}


const CreateNewCourse = (req ,res)=>{
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
}

const UpdateOnCource = (req , res)=>{
    const CoursesId = +req.params.CourseId;
     const course = Courses.find((co)=> co.id === CoursesId );

    if (!course) {
        return res.status(404).json({mas:"Cources Nout Found"})      
    }

    const courses = {...course , ...req.body}  //  merge between  details course  and the update data git from  req.body
    res.json(courses)
    res.end();

} 

const DeletCourse=  (req , res )=>{
    const CoursesId = +req.params.CourseId;
    if(!CoursesId)
    {
        res.json({mass:"Not Found"})
    }

    const course = Courses.filter((co)=> co.id != CoursesId );

    

    
    res.json(course)

}

module.exports= {
    GetAllCourses ,
    GetSingleCourse,
    CreateNewCourse,
    UpdateOnCource,
    DeletCourse

}