import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../funcionario.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-funcionario-list-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers:[FuncionarioService],
  templateUrl: './funcionario-list-page.component.html',
  styleUrl: './funcionario-list-page.component.scss'
})
export class FuncionarioListPageComponent implements OnInit{

  constructor(private funcionarioService:FuncionarioService){

  }

  public ngOnInit(): void {
    this.funcionarioService.getById(1).subscribe(e => console.log(e));
  }
}
