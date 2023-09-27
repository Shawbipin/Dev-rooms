const jwt = require("jsonwebtoken");

let authenticate = async (request, response, next) => {
  try {
    let token;
    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith("Bearer")
    ) {
      token = request.headers.authorization.split(" ")[1]; // Bearer {token}
      //   .split(" "): This part of the code splits the Authorization header value into an array
      // by using a space character (" ") as the separator. The JWT is typically included in the header with a
      // format like "Bearer {token}", where "Bearer" is a type of authentication and "{token}" is the actual JWT.
      //   So, splitting by space will separate the two parts.
      //  the JWT  is the second part, so this step effectively extracts the JWT from the header.
    }
    if (!token) {
      // this code block is responsible for handling the case where there is no valid JWT in the Authorization header.
      //It responds with an HTTP 401 status code and a JSON message indicating that the user is unauthorized
      response.status(401).json({ msg: "User unauthorized" });
    }

    const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // decyrpted the token
    // This line of code is used to check if a secret message, called a JSON Web Token (JWT),
    // is genuine and hasn't been tampered with. It uses a special key, known only to the server,
    // to open the message. If the key fits and the message opens successfully, it means the JWT is valid,
    // and we can trust the information inside it. If it doesn't open, it means the JWT might be
    // fake or changed by someone else, so we won't use it."
    request.user = verifiedToken.user;
    console.log(request.user);
    next();
    
    // next() is used to continue the flow of processing an
    //  HTTP request through the middleware chain. 
    
    //  By calling next(), you indicate that the current middleware
    //  has completed its task successfully, and you want to pass control
    //  to the next middleware or route handler in the chain.
  } catch (error) {
    console.error(error);
    response.status(500).json({ msg: "Invalid Token" });
  }
};
module.exports = authenticate;


