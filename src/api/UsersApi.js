import RestClient from "./RestClient";
import User from "../model/User";

export default class UsersApi extends RestClient {
    static instance = null;

    constructor() {
        // Initialize with your base URL
        super(`${process.env.REACT_APP_WS_URL_USERS}/api/users`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        // console.log('initializing UsersApi');
    }

    static getInstance() : UsersApi {
        if (UsersApi.instance == null) {
            UsersApi.instance = new UsersApi();
        }
        return this.instance;
    }

    async getAllUsers() {
        const response = await this.GET("/");
        return response;
    }

    /**
     * 
     * @param {number} id id of the user to retrieve
     * @returns {User} user found if exists
     */
    async findUser(id) {
        const response = await this.GET(`/${id}`);
        return response;
    }

    /**
     * @param {User} user user that will be created
     */
    async createUser(user) {
        const response = await this.POST("/", null, user);
        return response;
    }

    /**
     * @param {number} id id of the user to delete
     * @returns {User} user that has been deleted
     */
    async deleteUser(id) {
        const response = await this.DELETE(`/${id}/`);
        return response;
    }

    /**
     * @param {User} user the user that will be updated
     * @returns {User} the user object updated
     */
    async updateUser(user) {
        const response = await this.POST(`/`, null, user);
        return response;
    }
}