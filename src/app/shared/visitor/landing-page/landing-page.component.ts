import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnInit {
  readonly pathFotoCapa = '../../../../assets/images/capa.png.jpg';

  ngOnInit(): void {
  }
}
