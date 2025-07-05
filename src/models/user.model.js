import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            //trim: true ka kaam hota hai — extra spaces hata dena string ke start aur end se.
            index: true
            //Jab tu MongoDB me kisi field pe .index: true lagata hai,toh MongoDB us field ki search copy
            // (index) bana leta hai jisse queries super fast ho jaati hain.
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary url yaha ka url will use
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url yaha ka url will use
        },
        watchHistory: [
            //depends on video model
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            //we can give messages with all true fields if required
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
        //handles CreatedAT AND UpdatedAT
    }
)

//bcrypt hash aur check dono kr skta h
//password encrypt process:
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // agar password change hi nahi hua, toh aage badh ja

    this.password = await bcrypt.hash(this.password, 10); // password ko encrypt karo ,10 here is round of encryp
    next(); // aage jao, save kar do
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};
//Jab user login kare, tu check karega ki:
// Usne jo password enter kiya hai (password)
// Wo DB me stored encrypted password se match karta hai ya nahi

//JWT
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        //  1. Payload (token ke andar kya rahega)
        process.env.ACCESS_TOKEN_SECRET,
        //  2. Secret key (token ko sign karne ke liye)
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
             //  3. Kab tak valid rahega
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
    _id: this._id,
    },                          //  1. Payload (token ke andar kya rahega)
  process.env.REFRESH_TOKEN_SECRET,  //  2. Secret key (token ko sign karne ke liye)
    {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY  //  3. Kab tak valid rahega
    }
);

}


export const User = mongoose.model("User", userSchema)