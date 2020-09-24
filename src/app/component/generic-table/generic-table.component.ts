import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {merge, of} from 'rxjs';
import {MatSort} from '@angular/material/sort';
import {People} from '../../model/people';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {GenericService} from '../../service/generic.service';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponent} from './modal/modal.component';
import {TableSchema} from './model/tableSchema';
import {MatTableDataSource} from '@angular/material/table';
import {element} from 'protractor';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent implements AfterViewInit {

  @Input() tableSchema: TableSchema = {
    columns: []
  };
  displayedColumns: string[] = [];
  @Input() service: GenericService<any>;
  @Input() dataSource = [];
  matDataSource = new MatTableDataSource();
  @Input() route = [''];

  resultLength = 0;
  onCharge = true;
  offline: boolean = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog, private cdRef:ChangeDetectorRef) {

  }

  ngAfterViewInit() {

    this.tableSchema.columns.forEach((column)=>{
      this.displayedColumns.push(column.json_name);
    });
    console.log(this.displayedColumns);
    console.log(this.dataSource);

    // console.log(this.displayedColumns);
    // this.displayedColumns.push('actions');
    // console.log(this.displayedColumns);

    if(this.dataSource.length == 0){
      this.sort.sortChange.subscribe(() => {
        this.paginator.pageIndex = 0;
      });

      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.onCharge = true;
            return this.service.getAllWithPagination(
              this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction
            )
          }),
          map((data) => {
            this.onCharge = false;
            this.resultLength = data.totalElements;
            return data.content
          }),
          catchError((error) => {
            this.onCharge = false;
            let temp: People[] = []
            return of([]);
          })
        ).subscribe((data) => {
        this.dataSource = data;
      })
    }
    else{
      this.offline = true;
      this.resultLength = this.dataSource.length;
      this.paginator.length = this.resultLength;
      this.matDataSource.data = this.dataSource;
      this.matDataSource.paginator = this.paginator;
      this.matDataSource.sort = this.sort;
    }

    this.cdRef.detectChanges();
  }

  typeOf(any){
    return typeof any;
  }

  viewAtt(element){
    console.log(Object.keys(element));
  }

  // openDialog(any: Object, column: string, isRoot: boolean): void {
  //   console.log(any)
  //   let data = {
  //     isRoot: isRoot,
  //     title: column,
  //     object: any,
  //     service: this.service
  //   }
  //   const dialogRef = this.dialog.open(ModalComponent, {
  //     width: '300px',
  //     data: data
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //   });
  // }

  openDialog(column: TableSchema, json: Object){
    let data = {
      json: json,
      column: column,
      service: this.service,
      route: (this.route[0] == '' || this.route[0] == 'root' && this.route.length < 2) ? ['root'] : this.route
    };
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '800px',
      height: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('------------------');
      //console.log(this.dataSource);
      console.log(this.matDataSource.data)
      const data = this.dataSource.find(element => element.id == result.id);
      this.dataSource.splice(this.dataSource.indexOf(data), 1, result);
      console.log(result);
      this.matDataSource.data = this.dataSource;
      console.log('------------------');
    });
  }

}
