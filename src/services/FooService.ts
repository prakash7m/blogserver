import { injectable } from "inversify";

@injectable()
export class FooService {
    async getArticle (id: string) {
        return 'example-' + id;
    }
}