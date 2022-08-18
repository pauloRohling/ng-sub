# NgSubDirective

[![npm](https://img.shields.io/npm/v/@reactive-wind/ng-sub)](https://www.npmjs.com/package/@reactive-wind/ng-sub)
[![npm](https://img.shields.io/npm/dw/@reactive-wind/ng-sub)](https://www.npmjs.com/package/@reactive-wind/ng-sub)

This is a **Standalone Angular Directive** to avoid creating multiple subscriptions with AsyncPipe by centralizing the subscription and providing it through template context.

## Usage

After importing the Directive into your Module, you can use it as a structural directive, such as ``*ngIf`` or ``*ngFor``, except you don't need to do a ``| async`` in your Subscribable<T>. You must provide an alias for it as this is how the **next values** will be provided.

```html
<ng-container *ngSub="message$ as message">

  <app-message-danger [text]="message"></app-message-danger>

  <app-message-light [text]="message"></app-message-light>

  <app-message-success [text]="message"></app-message-success>

</ng-container>
```

You can also use it with an implicit ``let`` variable to match the Subscribable type.

```html
<!-- 'message' will be typed -->
<ng-container *ngSub="message$; let message">

  <app-message-danger [text]="message.error"></app-message-danger>

  <app-message-light [text]="message.description"></app-message-light>

  <app-message-success [text]="message.success"></app-message-success>

</ng-container>
```

This directive also supports an array of Subscribable<T>, like the code below. It's important to keep in mind that the inputs will be passed to a `combineLatest()`, so it will only emit a value when all Subscribables emit the first value.

```html
<!-- 'message' will be typed -->
<ng-container *ngSub="[message$, warning$]; let tuple">

  <app-message-danger [text]="tuple[0].error"></app-message-danger>

  <app-message-light [text]="tuple[0].description"></app-message-light>

  <app-message-success [text]="message.success"></app-message-success>

  <app-warning [text]="tuple[1].text"></app-warning>

</ng-container>
```
<br>
Inspired by <a href="https://github.com/NetanelBasal">Netanael Basal</a>
