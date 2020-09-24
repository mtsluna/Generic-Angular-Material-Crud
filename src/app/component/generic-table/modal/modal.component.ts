import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GenericService} from '../../../service/generic.service';
import {isRoot} from '@angular/compiler-cli/src/ngtsc/file_system';
import {TableSchema} from '../model/tableSchema';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  title: string = '';
  inputs: string[] = [];
  formGroup: FormGroup = new FormGroup({});
  service: GenericService<any>;
  fullData: any;
  result: any;
  resultInfo: string = '';
  isRoot: boolean = false;
  isArray: boolean = false;
  route: string [] = [];
  json = {};

  displayedColumns: string[] = [];
  column: TableSchema;

  //ATRIBUTOS 23-09

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: string[],
              public matDialogRef: MatDialogRef<ModalComponent>) {
    this.column = data['column'];
    data['route'].push(this.column.json_name);
    this.route = data['route'];
    this.column.columns?.forEach((column)=>{
      this.displayedColumns.push(column.json_name);
    });
    this.fullData = data['json'];
    this.service = data['service'];
    this.generateFormGroup(this.column.columns, this.fullData);
    console.log(this.formGroup)
    console.log(data['route'])
    console.log(data)
    this.json = data['json'];
    matDialogRef.beforeClosed().subscribe((data)=>{
      matDialogRef.close(this.json);
    })
    // console.log(data);
    // this.isRoot = data['isRoot'];
    // if(this.isRoot == true){
    //   this.title = data['title'];
    //   this.inputs = Object.keys(data['object']);
    //   this.generateFormGroup(data['object']);
    //   this.service = data['service'];
    //   this.fullData = data['object'];
    // }
    // else{
    //   this.title = data['title'];
    //   if(Array.isArray(data['object'][this.title])){
    //     if(data['object'][this.title].length > 0){
    //       this.inputs = Object.keys(data['object'][this.title][0]);
    //       this.fullData['object'];
    //     }
    //     ///CONSIDERAR CUANDO EL ARRAY ES 0
    //     this.service = data['service'];
    //     this.isArray = true;
    //   }
    //   else{
    //     this.inputs = Object.keys(data['object'][this.title]);
    //     this.generateFormGroup(data['object'][this.title]);
    //     this.service = data['service'];
    //     this.fullData = data['object'];
    //   }
    // }
  }

  ngOnInit(): void {

  }

  generateFormGroup(columns: TableSchema[], data: any){
    this.formGroup = this.formBuilder.group({});
    columns.forEach((element)=>{
      if(element.type.toString() != 'object' || element.type.toString() !== 'array' || element.type.toString() !== 'actions'){
        if(element.json_name == 'id'){
          this.formGroup.addControl(
            element.json_name, new FormControl({
              value: element.initialValue,
              disabled: true
            }, element.validations)
          )
        }
        else{
          this.formGroup.addControl(
            element.json_name, new FormControl({
              value: element.initialValue,
              disabled: false
            }, element.validations)
          )
        }
      }
    });
    console.log(columns);
    this.formGroup.patchValue(data[this.column.json_name]);
  }

  save(){
    let object = {};
    let flag = 0;

    /*
    *  This method create an object from change to root
    *  The first step is apply a revers order of list of route
    *  'change' -> 'x' -> 'x' -> 'x' -> 'root'
    *  with this method you can wrap a data from form with a similar
    *  structure that the original object
    */

    this.route.reverse().forEach((r)=>{
      // If the actual route is not a root
      if(r != 'root'){
        // Create an empty wrapper
        let objectD = {};
        // If flag is equal than 0
        if(flag == 0){
          // Assign a form content to this object
          // This represent the most deep point of the modification.
          Object.defineProperty(objectD, r, {
            value: this.formGroup.value,
            configurable: true,
            writable: true,
            enumerable: true
          });
        }
        // If flag is different that 0, proceed to apply a wrapper to object
        else{
          // Define an recursivity wrapper with the actual route an old object
          // like a value
          Object.defineProperty(objectD, r, {
            value: object,
            configurable: true,
            writable: true,
            enumerable: true
          });
        }
        // Assign the value of object temp to a method object
        object = objectD;
      }
      // Count in flag.
      flag++;
    });

    console.log(object);
    //Object builded from a raw constructor
    let copyData = Object.assign({}, object);
    let copyFullData = Object.assign({}, this.fullData);
    let copy = Object.assign(copyFullData, copyData);
    console.log(copy);

    this.service.putById(this.fullData['id'], copy).subscribe((data)=>{
      this.result = data;
      this.json = data;
      this.resultInfo = 'success';
    }, (error => {
      this.resultInfo = 'error';
    }))

    //let data = Object.assign(copyFullData, this.fullData as Object)
    //console.log(data);

    //Original data
    //console.log(JSON.stringify(this.fullData));

    //Data merged
    //Object.assign(this.fullData, object);
    //console.log(object)

    // console.log(this.column);
    // console.log(this.fullData);
    // console.log(this.route);
    // console.log(this.fullData);
    //
    // this.data = this.fullData;
    //
    // this.route.forEach((route)=>{
    //   if(route != 'root'){
    //     this.data = this.data[route];
    //     console.log(this.data);
    //   }
    // });
    // this.data = this.formGroup.getRawValue();
    //
    // console.log('test');
    // console.log(this.formGroup.getRawValue());
    // console.log('test');
    //
    // console.log(this.fullData);
    //
    // let principal = {};
    // if(this.route.length > 1){
    //   principal[this.route[this.route.length-1]] = this.data;
    // }

    //let flag = 0;
    // this.route.forEach((route)=>{
    //   final[route] = {};
    // });

    // console.log(final);

    // obj['address'] = this.data;
    //
    // console.log(obj);

    // let obj = {};
    // let flag = 0;
    // let reverse = this.route.slice().reverse().forEach((route)=>{
    //   if(flag == 0){
    //     if(route != 'root'){
    //       obj[route] = this.data;
    //     }
    //   }
    //   else{
    //     obj[route] = obj;
    //   }
    //   flag++;
    // });


    // console.log(obj);

    //console.log(reverse)

    // if(this.isRoot == true){
    //   this.inputs.forEach((element)=>{
    //     this.fullData[element] = this.formGroup.value[element];
    //   })
    // }
    // else{
    //   this.fullData[this.title] = this.formGroup.value;
    // }
    // this.service.putById(this.fullData['id'], this.fullData).subscribe((data)=>{
    //   this.result = data;
    //   this.resultInfo = 'success';
    // }, (error => {
    //   this.resultInfo = 'error';
    // }))
  }

  typeOf(any){
    return typeof any;
  }

}
