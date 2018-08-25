/* tslint:disable */
import { Category } from './category';
import { BasicTaskViewModel } from './basic-task-view-model';
import { AccessRightsUserViewModel } from './access-rights-user-view-model';
export interface CompleteCategoryViewModel {
  id?: number;
  name?: string;
  parent?: Category;
  subCategories?: Array<Category>;
  tasks?: Array<BasicTaskViewModel>;
  users?: Array<AccessRightsUserViewModel>;
}
