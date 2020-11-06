import RestClient from "./RestClient";

export default class TasksApi extends RestClient {
    static instance = null;

    constructor() {
        // Initialize with your base URL
        super(`${process.env.REACT_APP_WS_URL_TASKS}/api/tasks`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        // console.log('initializing TasksApi');
    }

    static getInstance() : TasksApi {
        if (TasksApi.instance == null) {
            TasksApi.instance = new TasksApi();
        }
        return this.instance;
    }

    async getAllTasks() {
        const response = await this.GET("/");
        return response;
    }

    /**
     * @param {number} id id of the task to retrieve
     * @returns {Task} task found if exists
     */
    async findTask(id) {
        const response = await this.GET(`/${id}`);
        return response;
    }

    /**
     * @param {number} userId userId owner of the task 
     * @returns {Task} task found if exists
     */
    async findTasksByUserId(userId) {
        const response = await this.GET(`/user/${userId}`);
        return response;
    }

    /**
     * @param {Task} task task that will be created
     */
    async createTask(task) {
        const response = await this.POST("/", null, task);
        return response;
    }

    /**
     * @param {number} id id of the task to delete
     * @returns {Task} task that has been deleted
     */
    async deleteTask(id) {
        const response = await this.DELETE(`/${id}/`);
        return response;
    }

    /**
     * @param {Task} task the task that will be updated
     * @returns {Task} the task object updated
     */
    async updateTask(task) {
        const response = await this.POST(`/`, null, task);
        return response;
    }
}