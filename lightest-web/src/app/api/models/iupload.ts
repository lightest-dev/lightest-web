/* tslint:disable */
import { ApplicationUser } from './application-user';
export interface IUpload {
  message?: string;
  points?: number;
  status?: string;
  testingFinished?: boolean;
  uploadId?: number;
  user?: ApplicationUser;
  userId?: string;
}
