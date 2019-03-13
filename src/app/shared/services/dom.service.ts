import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ApplicationRef
} from '@angular/core';
import {AdComponent} from '../directives/ad.component';


@Injectable()
export class DomService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  appendComponent(component: any, selector: string, data) {
    // Create a component reference from the component
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    (<AdComponent>componentRef.instance).data = data;

    // Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // Append DOM element to the body
    document.querySelector(selector).appendChild(domElem);

    return componentRef;
  }

  destroy(componentRef) {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }

}
