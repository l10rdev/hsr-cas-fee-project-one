export default class TaskService {
  constructor(httpService, baseUrl) {
    this.httpService = httpService;
    this.baseUrl = baseUrl;
  }

  async getAll() {
    return this.httpService.get(this.baseUrl);
  }

  async getById(id) {
    return this.httpService.get(`${this.baseUrl}/${id}`);
  }

  async create(task) {
    return this.httpService.post(this.baseUrl, {...task, createdAt: moment().format('YYYY-MM-DD HH:mm:ss')});
  }

  async update(task) {
    return this.httpService.put(`${this.baseUrl}/${task._id}`, task);
  }

  async delete(task) {
    return this.httpService.delete(`${this.baseUrl}/${task._id}`);
  }
}
