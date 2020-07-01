import { Component, OnInit } from '@angular/core';
import {PeopleService} from '../../service/people.service';

@Component({
  selector: 'app-example-demo',
  templateUrl: './example-demo.component.html',
  styleUrls: ['./example-demo.component.css']
})
export class ExampleDemoComponent implements OnInit {

  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
  }

}
