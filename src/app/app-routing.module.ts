import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SegementEditorComponent } from './segement-editor/segement-editor.component';
import { MenuComponent } from './menu/menu.component';
import { SegementViewComponent } from './segement-view/segement-view.component';
import { plannerGuard } from './planner.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/menu',
    pathMatch:'full'
  },
  {
    path: 'menu',
    component:MenuComponent
  },
  {
  path: 'segments',
  component: SegementEditorComponent,
  canActivate:[plannerGuard]
},{
  path:'segments-view',
  component: SegementViewComponent,
  canActivate:[plannerGuard]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
