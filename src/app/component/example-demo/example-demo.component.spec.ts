import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleDemoComponent } from './example-demo.component';

describe('ExampleDemoComponent', () => {
  let component: ExampleDemoComponent;
  let fixture: ComponentFixture<ExampleDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
