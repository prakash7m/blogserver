import * as express from "express";
import { interfaces, controller, httpGet, queryParam } from "inversify-express-utils";
import { inject } from "inversify";
import { FooService } from "../services/FooService";


@controller("/foo")
export class FooController implements interfaces.Controller {

    constructor( @inject("FooService") private fooService: FooService ) {}

    @httpGet("/:id")
    private async getArticle(req: express.Request, res: express.Response): Promise<void> {
        try {
            const article = await this.fooService.getArticle(req.params.id);
            console.log(article)
            res.status(200).json({data: article});
        } catch (err) {
            res.status(400).json({error: err.message});
        }
    }

    @httpGet("/")
    private list(@queryParam("start") start: number, @queryParam("count") count: number): string {
        // return this.fooService.get(start, count);
        return 'test';
    }    
}