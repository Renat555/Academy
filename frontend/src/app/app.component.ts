import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [HttpService],
})
export class AppComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.sendCount().subscribe((data) => {
      console.log(data);
    });
  }
}
