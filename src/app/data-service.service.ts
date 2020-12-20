import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { delay } from 'rxjs/internal/operators';

// Data format for first call
export interface DataStore1 {
  dataValue1: string;
  dataValue2: string;
}

// Data format for second call
export interface DataStore2 {
  dataValue1: string;
  dataValue2: string;
}

// Combined data for publishing
export interface StoredData {
  data1: DataStore1;
  data2: DataStore2;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // BehaviorSubjects require a default data set
  private storedData: StoredData = this.initializeData();
  private data = new BehaviorSubject<StoredData>(this.storedData);
  data$ = this.data.asObservable();

  constructor() { }

  // Method can be called anywhere in the app to set data by type and partially fill complete data set
  setData(type: string, value: any): void {
    this.storedData[type] = value;
    this.data.next(this.storedData);
  }

  // Simulates long http call that responds in 3 seconds
  getData1(): Observable<DataStore1> {
    const self = this;
    setTimeout(function () {
      self.storedData.data1.dataValue1 = 'We';
      self.storedData.data1.dataValue2 = 'received';
    }, 2999);

    return of(this.storedData.data1)
    .pipe (delay(3000));
  }

  // Simulates long http call that responds in 6 seconds
  getData2(): Observable<DataStore2> {
    const self = this;
    setTimeout(function () {
      self.storedData.data2.dataValue1 = 'all';
      self.storedData.data2.dataValue2 = 'data';
    }, 5999);

    return of(this.storedData.data2)
    .pipe (delay(6000));
  }

  private initializeData(): StoredData {
    const data: StoredData = {
      data1: {
        dataValue1: 'No Data',
        dataValue2: ''
      },
      data2: {
        dataValue1: '',
        dataValue2: ''
      }
    };
    return data;
  }
}


