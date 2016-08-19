import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {TextField} from "ui/text-field";
import {Grocery} from "../../shared/grocery/grocery";
import {AnimationCurve} from "ui/enums";
import {Image} from "ui/image";
import {View} from "ui/core/view";
import {Page} from "ui/page";
import {SimpleEvent} from "./event/event.component";
import {GestureTypes, SwipeGestureEventData, GesturesObserver} from "ui/gestures";
import {registerElement} from "nativescript-angular/element-registry";
import {MasterPage} from "../masterPage";
registerElement("event-view", () => SimpleEvent);


console.log('`Calendar`');

@Component({
  selector: 'calendar',
  templateUrl: "pages/calendar/calendar.html",
  directives:[SimpleEvent],
  providers: []
})
export class CalendarPage extends MasterPage {

  today:Date;
  days:Array<Object> = [];
  month:String;
  year:Number;
  lastDayMonth:number;
  tab_month:Array<String> = ['January', 'February',  'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  init:Boolean = false;
  idMonth:number;


  constructor(page: Page) {
      super(page);
  }

  ngOnInit() {
    console.log('hello `Calendar` component');

    this.initCalendar('2016/07/12');

  }

  initCalendar(updateDate)
  {

      let image:View = this.container.getViewById("testimage");
      var animation1 = image.createAnimation({
        translate: { x: 0, y: 300},
        duration: 2000,
        curve: AnimationCurve.easeIn
      });
      var animation2 = image.createAnimation({
        translate: { x: 0, y: 0},
        duration: 2000,
        curve: AnimationCurve.easeIn
      });

      animation1.play().then(()=>animation2.play());


      this.days = [];

      this.today = new Date(updateDate);
      this.month = this.tab_month[this.today.getMonth()];
      this.year = this.today.getFullYear();
      this.idMonth = this.today.getMonth();

      var lastd;
      var firstd;

      firstd = new Date(this.year.valueOf(), this.today.getMonth(), 1);

      console.log(firstd.getDay());
      // console.log(firstd.getDate());
      // console.log(this.tab_month[firstd.getMonth()]);

      var diff  : number = firstd.getDay();
      var d : any = {};
      var i : number = 0;

      if(diff>0)
      {
        lastd = new Date(this.year.valueOf(), this.today.getMonth()-1, 0);
        this.lastDayMonth = lastd.getDate();
        console.log("this.lastDayMonth "+this.lastDayMonth );
        for(i = this.lastDayMonth - diff +1; i < this.lastDayMonth; i++)
        {
          console.log("!! :"+i);
          d = {};
          var date =  new Date(this.year.valueOf(), this.today.getMonth()-1, i);
          d.day = date.getDay();
          d.date = date.getDate();
          d.month = this.tab_month[date.getMonth()];
          d.year = date.getFullYear();
          this.days.push(d);
        }
      }

      i = 1;
      lastd = new Date(this.today.getFullYear(), this.today.getMonth()+1, 0);
      this.lastDayMonth = lastd.getDate();
      console.log(">>> lastDay month "+this.lastDayMonth);
      console.log(">>> lastDay month "+lastd.getMonth());
      for(i=1; i<=this.lastDayMonth; i++)
      {
        d = {};
        // product.destinations = [];
        var date =  new Date(this.year.valueOf(), this.today.getMonth(), i);
        d.day = date.getDay();
        d.date = date.getDate();
        d.month = this.tab_month[date.getMonth()];
        d.year = date.getFullYear();
        this.days.push(d);
      }

    console.log(this.days);

    if(this.init == false)this.init = true;

    image.observe(GestureTypes.swipe, this.callBackGesture, this);
  }

  callBackGesture(args:SwipeGestureEventData)
  {
     console.log("Swipe Direction: " + args.direction);
     let month = this.idMonth;
     if(args.direction == 1)
     {
        month += 1;
     }else{
        month -= 1;
     }
     console.log('month :'+month);
     this.updateCalendar(month);
  }

  updateCalendar(id)
  {
     console.log('ouiiiiiiiiii '+id);
     if(this.init)
     {
       let monthView = this.container.getViewById("monthView");
       monthView.animate({
         translate: { x: 500, y: 0},
         duration: 700,
         curve: AnimationCurve.easeIn
       })
       .then(() => { this.initCalendar('2016/'+(id+1)+'/1') } )
       .then( () => { monthView.animate({
         translate: { x: 0, y: 0},
         duration: 700,
         curve: AnimationCurve.easeIn
       }) } );
    }else{
      this.initCalendar('2016/'+(id+1)+'/1');
    }


  }

  onVoted(agreed: boolean)
  {
    console.log(agreed);
  }

  getClassRow(value, id)
  {

      console.log('modulo'+(id%6));
      if(id%7 == 0 && id != 0) return true;
      else return false;


  }


}
