import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { BehaviorSubject, combineLatest, map, Observable, of, Subject, Subscription } from "rxjs";

class NgSubContext<T> {
  $implicit: T = null!;
  ngSub: T = null!;
}

type Subscribable<T> = Observable<T> | BehaviorSubject<T> | Subject<T>;

@Directive({
  selector: "[ngSub]",
  standalone: true,
})
export class NgSubDirective<T> implements OnInit, OnDestroy {
  private subscribable$: Array<Subscribable<T>>;
  private subscription: Subscription;
  private readonly context: NgSubContext<T>;

  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<NgSubContext<T>>,
              private changeDetector: ChangeDetectorRef) {
    this.subscribable$ = [ of({} as T) ];
    this.subscription = new Subscription();
    this.context = new NgSubContext<T>();
  }

  @Input()
  set ngSub(inputSubscribable: Subscribable<T> | Array<Subscribable<T>>) {
    const isArray = Array.isArray(inputSubscribable);
    this.subscribable$ = isArray ? inputSubscribable : [inputSubscribable];
    this.subscription.unsubscribe();
    this.subscription = combineLatest(this.subscribable$)
      .pipe(
        map((values) => isArray ? values : values[0])
      )
      .subscribe((values: any) => {
        this.context.$implicit = values;
        this.context.ngSub = values;
        this.updateView();
      });
  }

  private updateView(): void {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef, this.context);
    this.changeDetector.markForCheck();
  }

  ngOnInit(): void {
    this.viewContainer.createEmbeddedView(this.templateRef, this.context);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
