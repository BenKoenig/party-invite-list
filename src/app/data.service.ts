import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: any[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      arrivalTime: '10:00 AM',
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      phoneNumber: '0987654321',
      arrivalTime: '11:00 AM',
    },
    {
      firstName: 'Jack',
      lastName: 'Smith',
      phoneNumber: '0987654321',
      arrivalTime: '11:00 AM',
    },
    {
      firstName: 'Jason',
      lastName: 'Anderson',
      phoneNumber: '0987654321',
      arrivalTime: '11:00 AM',
    },
  ];
  private dataUpdated = new Subject<any[]>();

  setData(id: number, newData: any) {
    this.data[id] = newData;
    this.dataUpdated.next([...this.data]); // Notify subscribers
  }

  addData(newData: any) {
    this.data.push(newData);
    this.dataUpdated.next([...this.data]); // Notify subscribers
  }

  getData(id: number) {
    return this.data[id];
  }

  getAllData() {
    return [...this.data]; // Return a copy of the data
  }

  getDataUpdateListener() {
    return this.dataUpdated.asObservable();
  }
}
