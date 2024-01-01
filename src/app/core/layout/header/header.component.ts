import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
