// import jwt from "jsonwebtoken";
// import {  JwtPayload} from "../types/express";
import jwt from "jsonwebtoken";
export var is_auth = function (req, res, next) {
    var authorization = req.get("authorization");
    console.log(authorization);
    if (!authorization) {
        return res.send("Please login first");
    }
    var token = authorization.split(" ")[1];
    console.log("token = ", token);
    //varify the jwt token
    var decoded = jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            return res.status(403).send("Not valid token");
        }
        var payload = decoded;
        console.log("payload", payload);
        if (req.baseUrl === "/sadmin" && payload.role !== "admin") {
            return res.status(401).send("Only Admin can access this route");
        }
        // Attach the payload to the request object
        req.payload = {
            email: payload.email,
            userId: payload.user,
            role: payload.role,
        };
        next();
    });
};
