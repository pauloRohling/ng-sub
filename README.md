# NgSubDirective

[![npm](https://img.shields.io/npm/v/@reactive-wind/ng-sub)](https://www.npmjs.com/package/@reactive-wind/ng-sub)
[![npm](https://img.shields.io/npm/dw/@reactive-wind/ng-sub)](https://www.npmjs.com/package/@reactive-wind/ng-sub)

This is a **Standalone Angular Directive** to avoid creating multiple subscriptions with AsyncPipe by centralizing the subscription and providing it through template context.

## Prerequisites

- Angular 17.3

## Installation

```bash
npm install --save-dev @reactive-wind/ng-sub
```

## Usage

To use the `ngSub` directive, follow these steps:

1. Import the `NgSubDirective` into your Angular component:

   ```typescript
   import { Component } from "@angular/core";
   import { NgSubDirective } from "@reactive-wind/ng-sub";
   import { Observable } from "rxjs";
   
   @Component({
     standalone: true,
     selector: "app-your-component",
     templateUrl: "./your-component.component.html",
     styleUrls: ["./your-component.component.scss"],
     imports: [NgSubDirective] // <-- Import the directive
   })
   export class YourComponent {
     message$: Observable<Message>; // <-- Define your observable
   }
   ```

2. Use the `ngSub` directive in your template:

   ```html
   <ng-container *ngSub="message$ as message">
     <app-message-danger [text]="message"></app-message-danger>
     <app-message-light [text]="message"></app-message-light>
     <app-message-success [text]="message"></app-message-success>
   </ng-container>
   ```
