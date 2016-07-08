import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {TextField} from "ui/text-field";
import {Grocery} from "../../shared/grocery/grocery";
import {GroceryListService} from "../../shared/grocery/grocery-list.service";

var socialShare = require("nativescript-social-share");
var calendar = require("nativescript-calendar");

@Component({
  selector: "list",
  templateUrl: "pages/list/list.html",
  styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
  providers: [GroceryListService]
})
export class ListPage implements OnInit {
  groceryList: Array<Grocery> = [];
  grocery: string = "";
  isLoading = false;
  listLoaded = false;

  @ViewChild("groceryTextField") groceryTextField: ElementRef;

  constructor(private _groceryListService: GroceryListService) {}

  ngOnInit() {
    this.isLoading = true;
    this._groceryListService.load()
      .subscribe(loadedGroceries => {
        loadedGroceries.forEach((groceryObject) => {
          this.groceryList.unshift(groceryObject);
        });
        this.isLoading = false;
        this.listLoaded = true;
      });
  }

  add() {
    if (this.grocery.trim() === "") {
      alert("Enter a grocery item");
      return;
    }

    // Dismiss the keyboard
    let textField = <TextField>this.groceryTextField.nativeElement;
    textField.dismissSoftInput();

    this._groceryListService.add(this.grocery)
      .subscribe(
        groceryObject => {
          this.groceryList.unshift(groceryObject);
          this.grocery = "";
        },
        () => {
          alert({
            message: "An error occurred while adding an item to your list.",
            okButtonText: "OK"
          });
          this.grocery = "";
        }
      )
  }

  delete(grocery: Grocery) {
    this._groceryListService.delete(grocery.id)
      .subscribe(() => {
        var index = this.groceryList.indexOf(grocery);
        this.groceryList.splice(index, 1);
      })
  }

  share() {
    let list = [];
    for (let i = 0, size = this.groceryList.length; i < size ; i++) {
      list.push(this.groceryList[i].name);
    }
    let listString = list.join(", ").trim();

    // Only the title, startDate and endDate are mandatory, so this would suffice:
    var options = {
      title: 'Get groceries',
      // Make sure these are valid JavaScript Date objects.
      // In this case we schedule an Event for now + 1 hour, lasting 1 hour.
      startDate: new Date(new Date().getTime() + (60*60*1000)),
      endDate: new Date(new Date().getTime() + (2*60*60*1000)),
      location : ''
    };

    // You can however add lots of properties to enrich the Event:
    options.location = 'The shop';
    // options.notes = 'This event has reminders';
    //
    // // iOS has a separate 'url' field, but on Android the plugin appends this to the 'notes' field.
    // options.url = 'http://my.shoppinglist.com';
    //
    // // You can also override the default reminder(s) of the Calendar (in minutes):
    // options.reminders = {
    //   first: 30,
    //   second: 10
    // };
    //
    // // You can make this Event recurring (this one repeats every other day for 10 days):
    // options.recurrence = {
    //   frequency: Calendar.RecurrenceFrequency.DAILY, // DAILY|WEEKLY|MONTHLY|YEARLY
    //   interval: 2, // once every 2 days
    //   endDate: new Date(new Date().getTime() + (10*24*60*60*1000)) // 10 days
    // };
    //
    // // Want to use a custom calendar for your app? Pass in the 'id' or 'name'.
    // // If the name doesn't yet exist the plugin will create it for you.
    // options.calendar = {
    //   // id: 3,
    //   name: "NativeScript Cal"
    // };

    calendar.createEvent(options).then(
        function(createdId) {
          console.log("Created Event with ID: " + createdId);
        },
        function(error) {
          console.log("Error creating an Event: " + error);
        }
    );
    // socialShare.shareText(listString);
  }
}
