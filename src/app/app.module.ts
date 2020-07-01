import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {GenericTableComponent} from './component/generic-table/generic-table.component';
import {HttpClientModule} from '@angular/common/http';
import { ExampleDemoComponent } from './component/example-demo/example-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    GenericTableComponent,
    ExampleDemoComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
