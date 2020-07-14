import {Category} from '../Category';
import {Checker} from '../Checker';
import {Test} from '../Test';
import { BaseTask } from './BaseTask';

export class Task extends BaseTask {
  category: Category;
  checker: Checker;
  description: string;
  examples: string;
  points: number;
  public: boolean;
  tests: Test[];
  languages: [
    {
      id: string;
      memoryLimit: number;
      name: string;
      timeLimit: number;
    }
  ];
}
