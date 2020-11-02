import { CollectionViewer } from "@angular/cdk/collections";
import { DataSource } from "@angular/cdk/table";
import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { Category } from "../shared/models/Category";
import { BaseTask } from "../shared/models/tasks/BaseTask";
import { CategoriesService } from "../shared/services/categories.service";
import { FlatTreeControl } from '@angular/cdk/tree';


export class FlatTreeNode {
  constructor(
    public id: string,
    public label: string,
    public level = 1,
    public expandable = true,
    public isTask = false,
    public isLoading = false) { }
}

export class CategoryTreeDataSource implements DataSource<FlatTreeNode> {
  dataChange = new BehaviorSubject<FlatTreeNode[]>([]);

  get data(): FlatTreeNode[] { return this.dataChange.value; }
  set data(value: FlatTreeNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor (private _treeControl: FlatTreeControl<FlatTreeNode>,
    private categoriesService: CategoriesService) {}

  connect(collectionViewer: CollectionViewer): Observable<FlatTreeNode[]> {
    throw new Error("Method not implemented.");
  }
  disconnect(collectionViewer: CollectionViewer): void {
    throw new Error("Method not implemented.");
  }
  
  expandNode(node: FlatTreeNode, expand: boolean) {
    const index = this.data.indexOf(node);
    if (index < 0 || node.isTask) {
      return;
    }

    node.isLoading = true;

    this.categoriesService.getChildren(node.id).subscribe(children => {
      if (!children.tasks && !children.subCategories) {
        node.expandable = false;
        node.isLoading = false;
        return;
      }

      const nodes = children.subCategories.map(category => 
        new FlatTreeNode(category.id, category.name, node.level + 1)).concat(
        children.tasks.map(task =>
          new FlatTreeNode(task.id, task.name, node.level + 1, false, true)));
      this.data.splice(index + 1, 0, ...nodes);
      this.dataChange.next(this.data);
      node.isLoading = false;
    });
  }

  collapseNode(node: FlatTreeNode) {
    const index = this.data.indexOf(node);
    let count = 0;
    for (let i = index + 1; i < this.data.length
      && this.data[i].level > node.level; i++) {
      count++;
    }
    this.data.splice(index + 1, count);
    this.dataChange.next(this.data);
  }
}