import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule} from "@angular/common/http" 

import { NgxPaginationModule } from 'ngx-pagination';
import { DetectorLogsComponent } from './detector-logs/detector-logs.component';

@NgModule({
  declarations: [
    AppComponent,
    DetectorLogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxPaginationModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
