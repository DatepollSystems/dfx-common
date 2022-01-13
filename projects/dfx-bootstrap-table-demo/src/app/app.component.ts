import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbSort, NgbTableDataSource} from 'dfx-bootstrap-table';
import {FormControl} from '@angular/forms';

export type eventModel = {
  id: number;
  name: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // Filtering
  public filter = new FormControl();

  // Sorting
  @ViewChild(NgbSort, {static: true}) sort: NgbSort | undefined;

  public columnsToDisplay = ['id', 'name', 'actions'];
  public dataSource: NgbTableDataSource<eventModel> = new NgbTableDataSource();

  eventModels = [
    {
      id: 0,
      name: 'Event 1',
    },
    {
      id: 1,
      name: 'Event 2',
    },
    {
      id: 2,
      name: 'Event 3',
    },
    {
      id: 3,
      name: 'Event 4',
    },
  ];

  ngOnInit(): void {
    this.dataSource = new NgbTableDataSource<eventModel>(this.eventModels);
    // Sort has to be set after template initializing
    this.dataSource.sort = this.sort;

    this.filter.valueChanges.subscribe((value) => {
      this.dataSource.filter = value;
    });
  }
}
