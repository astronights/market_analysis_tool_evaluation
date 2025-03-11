import { Request, Response, Router } from 'express';

export class TestController {

    path = '/welcome';
    router = Router();

    constructor() {
        this.router.get(this.path, this.getMessage);
        this.router.post(this.path, this.submitName);
    }

    public async getMessage(req: Request, res: Response): Promise<any> {
        return res.status(200).json({"message": "Hello and welcome to the app"});
    }

    public async submitName(req: Request, res: Response): Promise<any> {
        return res.status(200).json({"message": `Hello ${req.query.name}`})
    }
}