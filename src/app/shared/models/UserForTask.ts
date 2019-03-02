export class UserForTask {
  canRead: boolean;
  canWrite: boolean;
  canChangeAccess: boolean;
  isOwner: boolean;
  deadline?: Date;
  taskId: string;
  userId?: string;
  userName?: string;
}
