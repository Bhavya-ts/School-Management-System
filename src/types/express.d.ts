import { Request } from "express";
declare global {
    namespace Express {
      interface Request {
        payload?: object; // Use a more specific type if you know the structure of 'payload'
      }
    }
  }
