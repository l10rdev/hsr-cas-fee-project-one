export class TaskService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    baseUrl = '/v1/tasks';

    async getAll() {
        return await this.httpService.get(this.baseUrl);
    }

    async getById(id) {
        return await this.httpService.get(`${this.baseUrl}/${id}`);
    }

    async create(task) {
        return this.httpService.post(this.baseUrl, task)
    }

    async update(task) {
        return this.httpService.put(`${this.baseUrl}/${task._id}`, task)
    }


}
