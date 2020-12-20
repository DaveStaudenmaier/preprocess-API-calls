import { Component } from '@angular/core';

import { DataService } from './data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

// On startup of this app, initiate 2 asynchronous requests for data
// and when data arrives for each, publish via Behavior Subject
export class AppComponent {
  title = 'preprocess';

  constructor(private dataService: DataService) {

    this.dataService.getData1()
    .subscribe(result => {
      this.dataService.setData('data1', result);
    });

    this.dataService.getData2()
    .subscribe(result => {
      this.dataService.setData('data2', result);
    });
  }

}
