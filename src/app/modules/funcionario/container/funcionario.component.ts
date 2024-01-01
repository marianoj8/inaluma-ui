import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-funcionario',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './funcionario.component.html',
  styleUrl: './funcionario.component.scss'
})
export class FuncionarioComponent {

}
