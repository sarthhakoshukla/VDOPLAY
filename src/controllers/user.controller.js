import { asyncHandler } from "../utils/asyncHandler.js";

//  Importing asyncHandler middleware (usually from 'express-async-handler')
// It catches errors in async functions and passes them to Express error handler.
const registerUser = asyncHandler(async (req, res) => {
    //-> go to asyncHandler.js

    //  In production: This will run when a client sends a POST request to /users/register
    // It sends a 200 OK response with a JSON message
    res.status(200).json({
        message: "OK"
    });

    //  If any error occurs in this async function (e.g., DB failure),
    // asyncHandler will catch it and forward to Express's error-handling middleware
});


export { registerUser }