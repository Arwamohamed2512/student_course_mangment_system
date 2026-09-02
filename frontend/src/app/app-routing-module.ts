import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Courses } from './courses/courses';
import { Profile } from './pages/profile/profile';

const routes: Routes = [
  { path: 'courses', component: Courses },
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: Profile
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
