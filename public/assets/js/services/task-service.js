export class TaskService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    baseUrl = '/v1/tasks';

    async getAll() {
        return await this.httpService.get(this.baseUrl);
    }

    async create(task) {
        return this.httpService.post(this.baseUrl, task)
    }
}
