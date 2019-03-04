import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';

import { AdDirective } from '../shared/directives/ad.directive';
import { AdItem }      from '../shared/directives/ad.item';
import { AdComponent } from '../shared/directives/ad.component';

@Component({
  selector: 'app-dynamic-ad',
  template: `<ng-template ad-host></ng-template>`
})
export class DynamicAdComponent implements OnInit, OnDestroy {
  @Input() ads: AdItem;
  @ViewChild(AdDirective) adHost: AdDirective;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.ads.component);

    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = this.ads.data;
  }
}
