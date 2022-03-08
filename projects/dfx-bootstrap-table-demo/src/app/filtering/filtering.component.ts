import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import {NgbTableDataSource} from 'dfx-bootstrap-table';
import {EventType, Helper} from '../Helper';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styles: [],
})
export class FilteringComponent implements OnInit, AfterViewInit {
  // Filtering
  public filter = new FormControl();

  public columnsToDisplay = ['id', 'name', 'actions'];
  public dataSource: NgbTableDataSource<EventType> = new NgbTableDataSource();

  ngOnInit(): void {
    this.dataSource = new NgbTableDataSource<EventType>(Helper.getTestData(250));
  }

  ngAfterViewInit() {
    this.filter.valueChanges.subscribe((value) => {
      this.dataSource.filter = value;
    });
  }
}
