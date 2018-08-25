/* tslint:disable */
import { ArchiveUpload } from './archive-upload';
import { CodeUpload } from './code-upload';
import { UserGroup } from './user-group';
import { UserTask } from './user-task';
import { CategoryUser } from './category-user';
export interface ApplicationUser {
  emailConfirmed?: boolean;
  archiveUploads?: Array<ArchiveUpload>;
  codeUploads?: Array<CodeUpload>;
  groups?: Array<UserGroup>;
  tasks?: Array<UserTask>;
  id?: string;
  userName?: string;
  normalizedUserName?: string;
  email?: string;
  normalizedEmail?: string;
  availableCategories?: Array<CategoryUser>;
  passwordHash?: string;
  securityStamp?: string;
  concurrencyStamp?: string;
  phoneNumber?: string;
  phoneNumberConfirmed?: boolean;
  twoFactorEnabled?: boolean;
  lockoutEnd?: string;
  lockoutEnabled?: boolean;
  accessFailedCount?: number;
}
