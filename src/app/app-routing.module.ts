import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExampleDemoComponent} from './component/example-demo/example-demo.component';


const routes: Routes = [
  {path: 'example', component: ExampleDemoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
