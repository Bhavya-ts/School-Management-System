import { Request } from 'express';
declare global {
    namespace Express {
      interface Request {
        payload?: any; // Use a more specific type if you know the structure of 'payload'
      }
    }
  }
