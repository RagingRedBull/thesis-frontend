import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { MapModel } from '../models/map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {
  maps: MapModel[] = [];
  constructor(private mapService: MapService) { }

  ngOnInit(): void {
   this.mapService.getLogs().subscribe(maps => this.maps = maps);
   console.log(JSON.stringify(this.maps));
  }

}
