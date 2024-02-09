import { Component, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private readonly _matIconRegistry = inject(MatIconRegistry);
  public title = 'Inaluma MakeUp';

  constructor() {
    document.head.getElementsByTagName('title')[0].innerText = this.title;
    this._matIconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
