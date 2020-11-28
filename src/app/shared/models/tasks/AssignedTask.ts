import { BaseTask } from "./BaseTask";

export class AssignedTask extends BaseTask {
  categoryId: string;
  public: boolean;
  points: number;
}