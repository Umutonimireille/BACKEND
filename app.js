const express = require ('express')
const app = express()
const bodyParser = require ('body-parser')
const mongoose = require ('mongoose')
const fs = require ('fs')
const port = 2500;
const path = require ('path')
const Photo = require ('./model')
//   const myCss = {
//     style : fs.readFileSync('./index.css','utf8')
// };

require('dotenv/config')

const multer = require ('multer')
app.use(express.static(__dirname + '/views'));
// const storage = multer.diskStorage(
//     destination:(req,file,cb) =>{
//         cb(null,'uploads')
//     },
//     filename:(req,file,cb) =>{
//         cb(null,file.fieldname + '-' + Date.now())
//     }
// });
const upload = multer({dest: '../uploads/'});

const  URL  = "mongodb+srv://mireille:cbv0aytEO9ZQriqa@cluster0.glct8.mongodb.net/imageDB?retryWrites=true&w=majority"

    mongoose.connect(URL , (err) => {
        if (err) {
            console.log(err);
        }
        if (!err) {
            console.log("The database is connected successfully");
        }


        
    })
 app.use(bodyParser.urlencoded({extended:true}))
 app.use(bodyParser.json())

 app.set("view engine","ejs");

 app.get('/',(req,res) => {
     Photo.find({},(err,items) => {
         if(err){
             console.log(err);
             res.status(500).send('an error occured',err)
         }else{
             res.render('imagesPage',{items:items})
         }
     })
 })
 app.post('/',upload.single('image'), async(req,res,next) =>{
     var obj = new  Photo({
         name:req.body.name,
         desc:req.body.desc,
         img:req.body.file
     })
     Photo.create(obj,(err,item) =>{
         if(err){
             console.log(err);
         }
         else{
             res.send(obj)
            
         }
       
        
     });
  
 });

app.listen(port ,() =>{
    console.log(`server running ${port}`);
})