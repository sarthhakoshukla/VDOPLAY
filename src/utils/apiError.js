// custom error class bana raha hai — ye bhi backend projects me ek standard cheez hai
// Custom error class for handling API errors in a structured way
class ApiError extends Error {

  // Constructor function to create new ApiError object
    constructor(
        statusCode,                             // HTTP status code (like 404, 500)
        message = "Something went wrong",       // Default error message
        errors = [],                            // Optional array for multiple error details
        stack = ""                              // Optional stack trace (for debugging)
        //Stack trace ek error ka debugging tool hota hai — batata hai error kis line se originate hua.
    ) {
        super(message);                         // Call parent Error class constructor with message
//JavaScript ka --^ built-in Error class ka constructor call kar raha (ye required hai jab tu extends use karta hai)
        this.statusCode = statusCode;           // Attach HTTP status code to error
        this.data = null;                       // Default data is null (no data on error)
        this.message = message;                 // Store error message
        this.success = false;                   // Set success to false (API failed)
        this.errors = errors;                   // Store detailed error(s) if any

        // If custom stack provided, use it. Else auto-capture the current stack trace
        if (stack) {
        this.stack = stack;
        } else {
        Error.captureStackTrace(this, this.constructor);
        }
    }
    }

    // Exporting the custom error class for use in other files
export { ApiError };
