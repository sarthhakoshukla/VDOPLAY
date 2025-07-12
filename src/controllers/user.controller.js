import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
//  Importing asyncHandler middleware (usually from 'express-async-handler')
// It catches errors in async functions and passes them to Express error handler.

const registerUser = asyncHandler(async (req, res) => {
console.log("dsfghjhgfdfghgfd");
     //1 get user details
    const {fullName,email,username,password}=req.body
    console.log("email:",email);

    //2 validate the data
    //either use this method or use one by one if condition block to check which parameter is empty
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    //3 check if user exist or not? email / username or use both
    const existedUser=await User.findOne({
        $or:[{ username },{ email }]
    })
    if(existedUser){
        throw new ApiError(409,"Username/Email already exists")
    }

    //4 check for images, check for avatar
    const avatarLocal = req.files?.avatar?.[0]?.path
                       //because req.files.avatar is an array, aur hum us array ka first file (index 0) access kar rahe hain.
    const coverLocal=req.files?.coverImage?.[0]?.path
    if(!avatarLocal){
        throw new ApiError(400,"Avatar file is required");
    }

    // 5.upload them to cloudinary: (response milega uss response mai se url niklna padega)
    const avatar=await uploadOnCloudinary(avatarLocal); //using await as it may take time to upload
    const cover=await uploadOnCloudinary(coverLocal); //using await as it may take time to upload
                ////check avatar again as when user posted avatar to multer toh user ne dia ya na dia to cloudinary
    if(!avatar){
        throw new ApiError(400,"Avatar file is required");
    }

    //6. create user object - create entry in db
        const user = await User.create({ //as this process will take time
        fullName,
        avatar: avatar.url,
        coverImage: cover?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    //7. check for user creation + remove password and refresh token field from response + return res
        const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

export { registerUser }

/*
    //-> go to asyncHandler.js

    //  In production: This will run when a client sends a POST request to /users/register
    // It sends a 200 OK response with a JSON message
    // res.status(200).json({
    //     message: "OK"
    // });

    //  If any error occurs in this async function (e.g., DB failure),
    // asyncHandler will catch it and forward to Express's error-handling middleware
});

*/


