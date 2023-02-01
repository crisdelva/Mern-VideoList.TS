import app from "./app" 
import "./database"

//app.use("/", app)
app.listen(app.get("port"),()=>{
    console.log("server on port", app.get("port"))
})


