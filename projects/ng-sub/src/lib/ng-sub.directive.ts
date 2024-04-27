import { ChangeDetectorRef, Directive, inject, Input, OnDestroy, TemplateRef, ViewContainerRef } from "@angular/core";
import { BehaviorSubject, first, Observable, of, Subject, Subscription } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

class NgSubContext<T> {
  public $implicit: T = null as any as T;
  public ngSub: T = null as any as T;
}

type Subscribable<T> = Observable<T> | BehaviorSubject<T> | Subject<T>;

@Directive({
  selector: "[ngSub]",
  standalone: true,
})
export class NgSubDirective<T> implements OnDestroy {
  private changeDetector = inject(ChangeDetectorRef);
  private templateRef = inject(TemplateRef<NgSubContext<T>>);
  private viewContainer = inject(ViewContainerRef);

  private subscribable$: Subscribable<T>;
  private subscription: Subscription;
  private createTemplate: Subject<unknown>;
  private readonly context: NgSubContext<T>;

  @Input()
  set ngSub(inputSubscribable: Subscribable<T>) {
    if (inputSubscribable !== this.subscribable$) {
      this.subscribable$ = inputSubscribable;
      this.subscription.unsubscribe();
      this.subscription = this.subscribable$.subscribe((value: T) => {
        this.context.$implicit = value;
        this.context.ngSub = value;
        this.createTemplate.next(-1);
        this.changeDetector.markForCheck();
      });
    }
  }

  constructor() {
    this.subscribable$ = of({} as T);
    this.subscription = new Subscription();
    this.createTemplate = new Subject<unknown>();
    this.context = new NgSubContext<T>();

    this.createTemplate.pipe(first(), takeUntilDestroyed()).subscribe(() => {
      this.viewContainer.createEmbeddedView(this.templateRef, this.context);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
