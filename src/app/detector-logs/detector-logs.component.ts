import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { DetectorLogService } from '../detector-log.service';
import { DetectorLog } from '../models/detector-log';
import { Pagination } from '../models/pagination';

@Component({
  selector: 'app-detector-logs',
  templateUrl: './detector-logs.component.html',
  styleUrls: ['./detector-logs.component.sass']
})
export class DetectorLogsComponent implements OnInit {
  pagination = {} as Pagination<DetectorLog[]>;
  page: number = 1;
  count: number = 0;
  dataSize = 20;
  isLoading: boolean = false;
  constructor(private detectorLogService: DetectorLogService) { }

  ngOnInit(): void {
    this.getLogs(this.dataSize,this.page);
    interval(5000).subscribe(() => {
      this.getLogs(this.dataSize,this.page);
    }
    )
  }

  getLogs(dataSize: number, page: number): void {
    this.detectorLogService.getLogs(dataSize, page).subscribe(logs => this.pagination = logs);
    this.isLoading = true;
  }
  updatePage(currentPage: number): void {
    this.page = currentPage;
    this.getLogs(this.dataSize, currentPage);
  }
}
