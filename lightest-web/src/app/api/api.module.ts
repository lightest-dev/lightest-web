/* tslint:disable */
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

import { CategoriesService } from './services/categories.service';
import { CheckersService } from './services/checkers.service';
import { GroupsService } from './services/groups.service';
import { LanguagesService } from './services/languages.service';
import { ResultsService } from './services/results.service';
import { TasksService } from './services/tasks.service';
import { TestsService } from './services/tests.service';
import { UploadsService } from './services/uploads.service';

/**
 * Module that provides instances for all API services
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
   CategoriesService,
   CheckersService,
   GroupsService,
   LanguagesService,
   ResultsService,
   TasksService,
   TestsService,
   UploadsService
  ],
})
export class ApiModule { }
