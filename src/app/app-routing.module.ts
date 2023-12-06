import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditScreenComponent } from './components/edit-screen/edit-screen.component';
import { ListScreenComponent } from './components/list-screen/list-screen.component';

const routes: Routes = [
  { path:"edit", component: EditScreenComponent},
  { path:"", component: ListScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
