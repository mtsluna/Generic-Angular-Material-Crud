import { Component, OnInit } from '@angular/core';
import {PeopleService} from '../../service/people.service';
import {TableSchema} from '../generic-table/model/tableSchema';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-example-demo',
  templateUrl: './example-demo.component.html',
  styleUrls: ['./example-demo.component.css']
})
export class ExampleDemoComponent implements OnInit {

  format: TableSchema = {
    display_name: 'Persona',
    type: 'object',
    columns: [
      {
        display_name: 'Id',
        json_name: 'id',
        initialValue: '',
        type: 'string',
      },
      {
        display_name: 'Name',
        json_name: 'name',
        initialValue: '',
        type: 'string',
      },
      {
        display_name: 'Surname',
        json_name: 'surname',
        initialValue: '',
        type: 'string',
      },
      {
        display_name: 'DNI',
        json_name: 'dni',
        initialValue: '',
        type: 'number',
      },
      {
        display_name: 'Addresses',
        json_name: 'address',
        initialValue: '',
        type: 'object',
        columns: [
          {
            display_name: 'Id',
            json_name: 'id',
            initialValue: '',
            type: 'string',
          },
          {
            display_name: 'Street',
            json_name: 'street',
            initialValue: '',
            type: 'string',
            validations: [
              Validators.required
            ]
          },
          {
            display_name: 'Number',
            json_name: 'number',
            initialValue: '',
            type: 'number',
          }
        ]
      },
      {
        display_name: 'Skills',
        json_name: 'skills',
        initialValue: '',
        type: 'array',
        columns: [
          {
            display_name: 'Id',
            json_name: 'id',
            initialValue: '',
            type: 'string',
          },
          {
            display_name: 'Name',
            json_name: 'name',
            initialValue: '',
            type: 'string',
          },
          {
            display_name: 'Description',
            json_name: 'description',
            initialValue: '',
            type: 'string',
          }
        ]
      },
      {
        display_name: 'Actions',
        json_name: 'actions',
        type: 'actions'
      }
    ]
  };

  constructor(public peopleService: PeopleService) { }

  ngOnInit(): void {
  }

}
