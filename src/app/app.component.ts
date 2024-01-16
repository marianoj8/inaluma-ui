import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Inaluma MakeUp';

  constructor() {
    document.head.getElementsByTagName('title')[0].innerText = this.title;
  }
}
