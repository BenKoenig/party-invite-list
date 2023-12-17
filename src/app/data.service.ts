import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: any[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '+43312312312',
      arrivalTime: '10:00',
    },
    {
      id: uuidv4(),
      firstName: 'Jane',
      lastName: 'Doe',
      phoneNumber: '+43312312312',
      arrivalTime: '11:00',
    },
    {
      id: uuidv4(),
      firstName: 'Jack',
      lastName: 'Smith',
      phoneNumber: '+43312312312',
      arrivalTime: '13:00 ',
    },
    {
      id: uuidv4(),
      firstName: 'Jason',
      lastName: 'Anderson',
      phoneNumber: '+43312312312',
      arrivalTime: '12:00',
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
    console.log(this.data);
  }

  getData(id: number) {
    return this.data.find((item) => item.id === id);
  }

  editData(id: number, newData: any) {
    const index = this.data.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.data[index] = newData;
      this.dataUpdated.next([...this.data]);
    }
  }

  getAllData() {
    return [...this.data]; // Return a copy of the data
    console.log(this.data);
  }

  getDataUpdateListener() {
    return this.dataUpdated.asObservable();
  }

  deleteData(id: number) {
    const index = this.data.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.dataUpdated.next([...this.data]); // Notify subscribers
    }
  }
}
