
// import jwt from "jsonwebtoken";
// import {  JwtPayload} from "../types/express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const is_auth = (req :Request, res:Response, next:NextFunction) => {
  const authorization = req.get("authorization");
  console.log(authorization);
  if (!authorization) {
    return res.send("Please login first");
  }

  const token = authorization.split(" ")[1];
  console.log("token = ", token);

 
  //varify the jwt token
  const decoded = jwt.verify(token,process.env.SECRET_KEY as string ,  (err,decoded) => {
    if (err) {
      return res.status(403).send("Not valid token");
    } 
    
    const payload = decoded as JwtPayload & { email: string; user: string; role: string };
    console.log("payload" , payload);
    
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
