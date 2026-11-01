const express =  require("express");
const { log } = require("node:console");
const app=express();


const Cources = [ 
    { 
        id:1,
        title:"Html",
        price:"250"
    },
    { 
        id:2,
        title:"Css",
        price:"350"
    },{ 
        id:3,
        title:"Js",
        price:"650"
    },
]

//  CRUD (create , read , update , delet ) operation 

app.get('/api/Cources' ,(req ,res)=>{
    res.json(Cources);
    res.end();
})

app.listen(3000, ()=>{
    console.log("Done Lisen");
    
})