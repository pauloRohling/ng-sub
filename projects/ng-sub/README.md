# NgSubDirective

This is a **Standalone Angular Directive** to avoid creating multiple subscriptions with AsyncPipe by centralizing the subscription and providing it through template context.

## Usage

After importing the Directive into your Module, you can use it as a structural directive, such as ``*ngIf`` or ``*ngFor``, except you don't need to do a ``| async`` in your Observable. You must provide an alias for it as this is how the **next values** will be provided.

```html
<ng-container *ngSub="message$ as message">
  
  <app-message-danger [text]="message"></app-message-danger>

  <app-message-light [text]="message"></app-message-light>

  <app-message-success [text]="message"></app-message-success>
  
</ng-container>
```

You can also use it with an implicit ``let`` variable to match the Observable type.

```html
<!-- 'message' will be typed -->
<ng-container *ngSub="message$; let message">

  <app-message-danger [text]="message.error"></app-message-danger>

  <app-message-light [text]="message.description"></app-message-light>

  <app-message-success [text]="message.success"></app-message-success>

</ng-container>
```
<br>
Inspired by [Netanael Basal](https://github.com/NetanelBasal)
