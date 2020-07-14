import { BaseTask } from "./BaseTask";

export class TaskShort extends BaseTask {
  description: string;
  categoryId: number;
  checkerId: number;
  examples: string;
  points: number;
  public: boolean;
}
