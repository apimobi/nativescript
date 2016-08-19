import {Component, ElementRef, OnInit, ViewChild,  EventEmitter, Input, Output} from "@angular/core";
import {ContentView} from "ui/content-view";


console.log('`Event`');


@Component({
  selector: 'event-view',
  templateUrl: "pages/calendar/event/event.html",
  providers: []
})


export class SimpleEvent extends ContentView {

  @Output() onVoted = new EventEmitter<boolean>();
  voted = false;

  vote(agreed: boolean) {
    console.log('prout');
    this.onVoted.emit(agreed);
    this.voted = true;
  }
    //...
}
