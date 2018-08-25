/* tslint:disable */
export interface UserTask {
  canChangeAccess: boolean;
  canRead: boolean;
  canWrite: boolean;
  deadline?: string;
  isOwner: boolean;
  taskId: number;
  userId: string;
}
