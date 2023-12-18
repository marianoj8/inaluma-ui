import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FuncionarioListPageComponent } from '../funcionario-list-page/funcionario-list-page.component';

@Component({
  selector: 'app-funcionario',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './funcionario.component.html',
  styleUrl: './funcionario.component.scss'
})
export class FuncionarioComponent {

}
