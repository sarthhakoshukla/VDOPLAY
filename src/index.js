import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from './app.js'

dotenv.config({
    path:'./.env'
})
connectDB()
.then(()=> {
    app.listen(process.env.PORT||3400,()=>{
        console.log(`Server is running on port ${process.env.PORT||3400}`);
    })
})
.catch((error)=>{
    console.log("Error connecting to the database",error);
})

//connecting to mongodb
/*
const app=express()
(async ()=>{

    try {
        await mongoose.connect(`process.env.${MONGOURI}/${DB_NAME}`);
        // Use the database name from the environment variable or a default value
        console.log("Connected to MongoDB");
        app.on("error", (error) => {
            console.error("Error in Express app:", error);
            throw error;
        });
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Express server is running on port ${process.env.PORT || 3000}`);
        });
    }

    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }

})();
*/
