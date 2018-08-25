/* tslint:disable */
export interface CategoryUser {
  canChangeAccess?: boolean;
  canRead?: boolean;
  canWrite?: boolean;
  categoryId: number;
  isOwner?: boolean;
  userId: string;
}
