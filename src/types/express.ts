import { Request } from "express";

export interface reqWithPayload extends Request {
  payload?: { // Optional payload
    email?: string;
    userId?: string;
    role?: string;
  };
}