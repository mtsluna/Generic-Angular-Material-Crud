import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {merge, of} from 'rxjs';
import {MatSort} from '@angular/material/sort';
import {PeopleService} from '../../service/people.service';
import {People} from '../../model/people';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {GenericService} from '../../service/generic.service';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent implements AfterViewInit {

  @Input() displayedColumns: string[] = [];
  @Input() service: GenericService<any>;
  dataSource = [];

  resultLength = 0;
  onCharge = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {

  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(()=>{
      this.paginator.pageIndex = 0;
    })

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(()=>{
          this.onCharge = true;
          return this.service.getAllWithPagination(
            this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction
          )
        }),
        map((data)=>{
          this.onCharge = false;
          this.resultLength = data.totalElements;
          return data.content
        }),
        catchError((error)=>{
          this.onCharge = false;
          let temp: People[] = []
          return of([]);
        })
      ).subscribe((data)=>{
        this.dataSource = data;
    })

  }

}
