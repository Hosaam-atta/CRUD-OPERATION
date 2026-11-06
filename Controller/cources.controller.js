// const {body , validationResult, param} = require("express-validator")
// let {Courses} = require('../data/Cources')
// const pool = require('../database/dp')
const httpstatus = require('../utils/httpstatus')
require('dotenv').config;

const mongoose = require('mongoose')
const url = process.env.MONGOO_URL
mongoose.connect(url).then( ()=>{

    
console.log("Connect mongose is success");

} )

let error = new Error();

const cource= require('../models/cource.model')

const handdleAsyncfn = require("../middlewares/handelerror")

const GetAllCourses =handdleAsyncfn(  async ( req , res )=>{
    const query = req.query;
    console.log(query);
    
    const limit = req.query.limit;
    const page = req.query.page;
    const skip = (page -1 ) * limit;

    const cources = await cource.find().limit(limit).skip(skip)
    res.json({status:"success" , data : {cources}})

                // using Postgresql
    //  const result = await pool.query("SELECT * FROM COURSE");
    // res.json(result.rows)

        // get all cources by mongoosDB
    
})

const GetSingleCourse = handdleAsyncfn(
    async (req ,res , next)=>{

        const getcource = await cource.findById(req.params.CourseId) 
        if (!getcource) {
            error.message =" Not Found Cource" ;
            error.statusCode = 404;
            return next(error);
            
        }
            res.json({status: httpstatus.success , data:{getcource}})



          // GET SINGLE COURCE BU  MONGOOSDB

            // try{
                
            // }catch(e)
            // {
            //     console.log("Finding Error " , e);
            //     res.status(404).json({ 
            //         status:httpstatus.Fail ,
            //         data:{cource :"null"}
            //     })
            // }

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


           
    
})


const CreateNewCourse =handdleAsyncfn( 
    async (req ,res , next)=>{

        const AddCource =  new cource(req.body)
        await AddCource.save()
        res.status(201).json({status:httpstatus.success ,data:AddCource})
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            error.message =" can not add cource" ;
            return next(error);
       
         }


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

 
})


const UpdateOnCource = handdleAsyncfn(
    async (req , res , next)=>{

     const CourceId = req.params.CourseId;
     const UpdatedCource =  await  cource.updateOne({_id:CourceId} , {$set:{...req.body}  })

     res.json({status : httpstatus.success , data: {UpdatedCource}})


    // const CoursesId = +req.params.CourseId;
    //  const course = Courses.find((co)=> co.id === CoursesId );

    // if (!course) {
    //     return res.status(404).json({mas:"Cources Nout Found"})      
    // }

    // const courses = {...course , ...req.body}  //  merge between  details course  and the update data git from  req.body
    // res.json(courses)
    // res.end();

     ///  update on course bu mongoosDB 
    //  try{
    //  const CourceId = req.params.CourseId;
    //  const UpdatedCource =  await  cource.updateOne({_id:CourceId} , {$set:{...req.body}  })
    //  res.json({status : httpstatus.success , data: {UpdatedCource}})
    //  }catch(e){
    //     res.status(401).json({status:httpstatus.Fail , data:{cources:null}})
    //  }


} 
)


const DeletCourse= handdleAsyncfn(
    async  (req , res )=>{



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
        data:null
    })
}
)


module.exports= {
    GetAllCourses ,
    GetSingleCourse,
    CreateNewCourse,
    UpdateOnCource,
    DeletCourse

}