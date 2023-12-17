import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

/**
 * @fileoverview This is the InviteDataComponent.
 *
 * The InviteDataComponent is responsible for displaying the data received from the DataService.
 * It subscribes to the data updates from the DataService and updates its own data property accordingly.
 * The data is then displayed in a table format in the component's template.
 * The table includes a header row with the column names and a row for each invitee.
 *
 */

@Component({
  selector: 'app-invite-data',
  templateUrl: './invite-data.component.html',
  styleUrls: ['./invite-data.component.scss'],
})
export class InviteDataComponent implements OnInit {
  allData: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadAllData();
    this.dataService.getDataUpdateListener().subscribe((data: any[]) => {
      this.allData = data;
    });
  }

  loadAllData() {
    this.allData = this.dataService.getAllData();
  }

  onDeleteData(id: number) {
    this.dataService.deleteData(id);
  }
}
