import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService, StoredData } from './../data-service.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  public returnedData: StoredData;

  constructor(private router: Router,
              private dataService: DataService) { }

  ngOnInit(): void {
    // Subscribe to BehaviorSubject which collects data for publication
    this.dataService.data$
    .subscribe(result => {
      this.returnedData = result;
    })
  }

  onClick(): void {
    this.router.navigateByUrl('/home');
  }
}
