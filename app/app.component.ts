import {Component, OnInit} from "@angular/core";
import {HTTP_PROVIDERS} from "@angular/http";
import {RouteConfig, Router} from "@angular/router-deprecated";
import {NS_ROUTER_DIRECTIVES, NS_ROUTER_PROVIDERS} from "nativescript-angular/router";
import {LoginPage} from "./pages/login/login.component";
import {ListPage} from "./pages/list/list.component";
import {CalendarPage} from "./pages/calendar/calendar.component";
import {Page} from "ui/page";
import {View} from "ui/core/view";
import {GestureTypes, SwipeGestureEventData, GesturesObserver, GestureEventData} from "ui/gestures";


@Component({
  selector: "main",
  directives: [NS_ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, NS_ROUTER_PROVIDERS],
  templateUrl: "./app.html"
})

@RouteConfig([
  { path: "/Login", component: LoginPage, name: "Login"},
  { path: "/List", component: ListPage, name: "List" },
  { path: "/Calendar", component: CalendarPage, name: "Calendar" , useAsDefault: true }
])
export class AppComponent implements OnInit {

  // private container:Page;
  private home:View;
  private calendarSocial:View;
  private calendarYear:View;
  private calendarMonth:View;
  private calendarWeek:View;

  constructor(private page: Page, private router: Router) {
      // this.container = page;
      // this.router = router;
  }

  ngOnInit() {
    console.log('hello `Master` component');
    this.calendarMonth = this.page.getViewById("calendarWeek");
    this.calendarMonth.observe(GestureTypes.tap, this.callBackGesture, this);
  }

  callBackGesture(arg)
  {
      console.log('callBackGesture '+arg);

      this.router.navigate(["/Login"]);
  }

}
