import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-static',
  template: `
   <p>
  		static Works!
   </p>
  `,
  styleUrls: ['./static.component.sass']
})
export class StaticComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
