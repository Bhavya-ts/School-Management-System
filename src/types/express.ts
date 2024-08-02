import { Request } from "express";
export interface reqWithPayload extends Request {
  payload:{
    email:string,
    userId:string,
    role:string
  }
}
