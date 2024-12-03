import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'docker-multi-service-app';
  tasks: any[] = [];

  constructor(private mainService: MainService) {}
  ngOnInit() {
    this.mainService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }
}
