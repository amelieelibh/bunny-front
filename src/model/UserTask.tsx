import { TaskStatus } from "./TaskStatus";

export default class UserTask {
    id: number;
    desc: string;
    status: TaskStatus;
    userId: number;

    public constructor(params: UserTask = {} as UserTask) {
        this.id = params.id;
        this.desc = params.desc;
        this.status = params.status;
        this.userId = params.userId;
    }
}