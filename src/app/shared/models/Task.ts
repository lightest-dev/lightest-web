import {Category} from './Category';
import {Checker} from './Checker';
import {Test} from './Test';

export class Task {
  id: string;
  name: string;
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
