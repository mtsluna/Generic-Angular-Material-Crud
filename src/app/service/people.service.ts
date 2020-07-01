import { Injectable } from '@angular/core';
import {GenericService} from './generic.service';
import {People} from '../model/people';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeopleService extends GenericService<People>{

  constructor(http: HttpClient) {
    super(http, 'people')
  }

}
