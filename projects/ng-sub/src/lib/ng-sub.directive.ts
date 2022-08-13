import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { BehaviorSubject, Observable, of, Subject, Subscription } from "rxjs";

export class NgSubContext<T> {
  public $implicit: T = null!;
  public ngSub: T = null!;
}

@Directive({
  selector: "[ngSub]",
  standalone: true,
})
export class NgSubDirective<T> implements OnInit, OnDestroy {
  private subscribable$: Observable<T> | BehaviorSubject<T> | Subject<T>;
  private subscription: Subscription;
  private readonly context: NgSubContext<T>;

  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<NgSubContext<T>>, private changeDetector: ChangeDetectorRef) {
    this.subscribable$ = of({} as T);
    this.subscription = new Subscription();
    this.context = new NgSubContext<T>();
  }

  @Input()
  set ngSub(inputSubscribable: Observable<T> | BehaviorSubject<T> | Subject<T>) {
    this.subscribable$ = inputSubscribable;
    this.subscription.unsubscribe();
    this.subscription = this.subscribable$.subscribe((value: T) => {
      this.context.$implicit = value;
      this.context.ngSub = value;
      this.changeDetector.markForCheck();
    });
  }

  ngOnInit(): void {
    this.viewContainer.createEmbeddedView(this.templateRef, this.context);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
