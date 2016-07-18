import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {TextField} from "ui/text-field";
import {Grocery} from "../../shared/grocery/grocery";

console.log('`Calendar`');

@Component({
  selector: 'calendar',
  templateUrl: "pages/calendar/calendar.html",
  providers: []
})
export class CalendarPage implements OnInit {

  today:Date;
  days:Array<Object> = [];
  month:String;
  year:Number;
  lastDayMonth:number;
  tab_month:Array<String> = ['January', 'February',  'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor() {

  }

  ngOnInit() {
    console.log('hello `Calendar` component');

    this.initCalendar('2016/07/12');

  }

  initCalendar(updateDate)
  {
      this.days = [];

      this.today = new Date(updateDate);
      this.month = this.tab_month[this.today.getMonth()];
      this.year = this.today.getFullYear();

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
  }

  updateCalendar(id)
  {
     console.log('ouiiiiiiiiii '+id);
     this.initCalendar('2016/'+(id+1)+'/1');
  }

  getClassRow(value, id)
  {

      console.log('modulo'+(id%6));
      if(id%7 == 0 && id != 0) return true;
      else return false;


  }


}
