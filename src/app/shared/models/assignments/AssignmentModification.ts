import { UserForTask } from "../UserForTask";

export class AssignmentModification {
  taskId: string;
  assignments: UserForTask[];

  public constructor(init?: Partial<AssignmentModification>) {
    Object.assign(this, init);
  }
}
