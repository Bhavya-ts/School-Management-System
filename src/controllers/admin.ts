import { Request , Response , NextFunction } from "express"


type reqBodyStudent = {
    name : string,
    age : number,
    std : number,
    division : string
}

export const addStudent = (req  : Request, res:Response , next:NextFunction)=>{
    const {name,age,std,division}  : reqBodyStudent= req.body;

    // console.log(name , age , std , division);
    
    
    
}