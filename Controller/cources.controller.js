const {body , validationResult, param} = require("express-validator")
let {Courses} = require('../data/Cources')
// const pool = require('../database/dp')

const mongoose = require('mongoose')
const url ="mongodb+srv://hosaamatta4_db_user:WPgRId0TAxC5hPM4@learn-mogodb.b9j9ahs.mongodb.net/Learn-Mongo"
mongoose.connect(url).then( ()=>{

    
console.log("Connect mongose is success");

} )

const cource= require('../models/cource.model')



const GetAllCourses = async (req ,res)=>{


                // using Postgresql
    //  const result = await pool.query("SELECT * FROM COURSE");
    // res.json(result.rows)

        // get all cources by mongoosDB
    const cources = await cource.find()
    res.json(cources)
}

const GetSingleCourse = async (req ,res)=>{

    // const course = Courses.find((co)=> co.id === CoursesId );s
            
    // GET SINGLE COURCE BY POSTGRESQL
//     const CoursesId = +req.params.CourseId;
//   try{
//     const result = await pool.query(
//     "SELECT id, title, price FROM course WHERE id = $1",
//     [CoursesId]
//      );
//      res.json(result.rows);
//      res.end();

//     }catch(e){

//     res.status(404).json({ mass: e});
//     }


             // GET SINGLE COURCE BU  MONGOOSDB

            
            try{
                const getcource = await cource.findById(req.params.CourseId) 
                res.json(getcource)


            }catch(e)
            {
                console.log("Finding Error " , e);
                res.status(404).json({ 
                    mass:"Finding Error" ,
                    data:e
                })
                


            }
    
}


const CreateNewCourse = async (req ,res)=>{
    //   try{
    //      console.log(req.body);
    //    const errors = validationResult(req);
    //    if(!errors.isEmpty()){
    //     return res.status(400).json(errors.array())
    //    }

    // // const corse = {
    // //     title:req.body.title,
    // //     price:req.body.price,
    // // }
    // // Courses.push(corse)

    //        // add cource by postgre
    // const {title , price } = req.body
    // const course = await pool.query(
    //     "Insert into course(title , price) values($1 , $2) RETURNING * ;"
    //     ,[title,price]
    // )

    // res.status(201).json({ mass: "Succesfuly Add Course" ,
    //     data: course.rows
    // });
    //   }catch(error)
    //   {
    //     console.log(error);
    //     res.status(401).json({mass: "Have a Error in operation"})
        
    //   }



     // add cource by using mongoosDB 

       const AddCource =  new cource(req.body)
       await AddCource.save()
       res.status(201).json(AddCource)
}

const UpdateOnCource = async (req , res)=>{
    // const CoursesId = +req.params.CourseId;
    //  const course = Courses.find((co)=> co.id === CoursesId );

    // if (!course) {
    //     return res.status(404).json({mas:"Cources Nout Found"})      
    // }

    // const courses = {...course , ...req.body}  //  merge between  details course  and the update data git from  req.body
    // res.json(courses)
    // res.end();

     ///  update on course bu mongoosDB 
     try{
     const CourceId = req.params.CourseId;
     const UpdatedCource =  await  cource.updateOne({_id:CourceId} , {$set:{...req.body}  })
     res.json(UpdatedCource)
     }catch(e){
        res.status(401).json("Finding Error In Update")
     }


} 

const DeletCourse= async  (req , res )=>{



    // const CoursesId = +req.params.CourseId;
    // if(!CoursesId)
    // {
    //     res.json({mass:"Not Found"})
    // }
    // const course = Courses.filter((co)=> co.id != CoursesId );
    // res.json(course)

    const DeletId =  req.params.CourseId
    const AfterDelet =  await cource.deleteOne({_id:DeletId});
    res.status(200).json({ 
        success:true ,
        mass:AfterDelet
    })
}

module.exports= {
    GetAllCourses ,
    GetSingleCourse,
    CreateNewCourse,
    UpdateOnCource,
    DeletCourse

}