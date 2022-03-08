import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {NgbTableDataSource} from '../../../dfx-bootstrap-table/src/lib/table/data-source';
import {NgbSort} from '../../../dfx-bootstrap-table/src/lib/sort/sort';

export type EventType = {
  id: number;
  name: string;
  something_complicated: string;
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
  public dataSource: NgbTableDataSource<EventType> = new NgbTableDataSource();

  eventModels: EventType[] = [
    {
      id: 0,
      name: 'Event 1',
      something_complicated: 'Text',
    },
    {
      id: 1,
      name: 'Event 2',
      something_complicated: 'Text',
    },
    {
      id: 2,
      name: 'Event 3',
      something_complicated: 'Text',
    },
    {
      id: 3,
      name: 'Event 4',
      something_complicated: 'Text',
    },
  ];

  ngOnInit(): void {
    this.dataSource = new NgbTableDataSource<EventType>(this.eventModels);
    // Sort has to be set after template initializing
    this.dataSource.sort = this.sort;

    this.filter.valueChanges.subscribe((value) => {
      this.dataSource.filter = value;
    });
  }
}
