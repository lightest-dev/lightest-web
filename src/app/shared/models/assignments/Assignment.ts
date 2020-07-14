import { BaseTask } from "../tasks/BaseTask";

export class Assignment extends BaseTask {
  deadline?: Date;
  completed: boolean;
  highScore: number;
}
