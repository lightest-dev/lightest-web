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

    // componentRef.instance['form'].subscribe(result => { console.log(result); }); // here observeVariable is an Observable in dynamic component(ie. this.componentRef)

     // componentRef.instance['name'] = `i'm dynamic component`;

    // Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // Append DOM element to the body
    document.querySelector(selector).appendChild(domElem);

    // Wait some time and remove it from the component tree and from the DOM
    // setTimeout(() => {
    //   this.appRef.detachView(componentRef.hostView);
    //   componentRef.destroy();
    // }, 3000);

  return componentRef.instance['form'];
  }

}
