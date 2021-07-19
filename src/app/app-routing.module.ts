import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetectorLogsComponent } from './detector-logs/detector-logs.component';
import { MapComponent } from './map/map.component';
/*
  Nice Tutorial: https://angular.io/tutorial/toh-pt5
*/
const routes: Routes = [
  { path: 'detector-logs', component: DetectorLogsComponent},
  { path: 'map', component: MapComponent},
  { path: '', redirectTo: '/detector-logs', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
