/* tslint:disable */
import { Group } from './group';
import { AccessRightsUserViewModel } from './access-rights-user-view-model';
export interface CompleteGroupViewModel {
  id?: number;
  name?: string;
  parent?: Group;
  subGroups?: Array<Group>;
  users?: Array<AccessRightsUserViewModel>;
}
