import { Component, ViewEncapsulation } from '@angular/core';
import { Globals } from '../globals';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-root',
  templateUrl: './app-admin.component.html',
  styleUrls: ['./app-admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppAdminComponent {
  constructor(private route: ActivatedRoute, public globals: Globals) { }
  ngOnInit() {
  }
}
