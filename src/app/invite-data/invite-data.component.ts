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
  // Array to hold all data
  allData: any[] = [];
  // Variable to keep track of selected item's ID
  selectedId: number | null = null;

  // Dependency injection of DataService for handling data operations
  constructor(private dataService: DataService) {}

  // Lifecycle hook that gets called after component initialization
  ngOnInit(): void {
    this.loadAllData(); // Load all data when the component is initialized
    // Subscribe to data updates from the DataService and update the local array accordingly
    this.dataService.getDataUpdateListener().subscribe((data: any[]) => {
      this.allData = data;
    });
  }

  // Method to load all data using the DataService
  loadAllData() {
    this.allData = this.dataService.getAllData();
  }
  
  // Method to handle click events, sets the selected ID
  handleClick(id: number) {
    this.selectedId = id;
  }

  // Method to handle closing, resets the selected ID
  handleClose() {
    this.selectedId = null;
  }

  // Method to delete data, calls the DataService's delete method
  onDeleteData(id: number) {
    this.dataService.deleteData(id);
  }
}