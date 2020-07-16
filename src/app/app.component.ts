import { Component, ViewEncapsulation } from '@angular/core';
import { Globals } from './globals';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(private route: ActivatedRoute, public globals: Globals) { }
  ngOnInit() {
  }
}
