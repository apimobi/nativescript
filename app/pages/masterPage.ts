import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {TextField} from "ui/text-field";
import {AnimationCurve} from "ui/enums";
import {Image} from "ui/image";
import {View} from "ui/core/view";
import {Page} from "ui/page";
import {GestureTypes, SwipeGestureEventData, GesturesObserver} from "ui/gestures";
import {registerElement} from "nativescript-angular/element-registry";

console.log('`Master`');

@Component({
})
export class MasterPage implements OnInit {

  protected container:Page;
  init:Boolean = false;

  constructor(page: Page) {
      this.container = page;
  }

  ngOnInit() {
    console.log('hello `Master` component');

  }
}
