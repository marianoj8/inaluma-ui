import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../service/funcionario.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../../shared/material.module';
import { Funcionario } from '../../../shared/model/funcionario';
import { MatTableDataSource } from "@angular/material/table";
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionario-list-page',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [FuncionarioService],
  templateUrl: './funcionario-list-page.component.html',
  styleUrl: './funcionario-list-page.component.scss'
})
export class FuncionarioListPageComponent implements OnInit {

  displayedColumns: string[] = ['#', 'Nome', 'Contato'];
  public dataSource = new MatTableDataSource<Funcionario>();

  constructor(
    private route: Router,
    private funcionarioService: FuncionarioService
  ) { }

  public ngOnInit(): void {
    this.fetchFuncionario();
  }

  public getFuncionarioById(id: number): void {
    this.funcionarioService.getById(id).subscribe((e) => this.dataSource.data.push(e));
  }

  public fetchFuncionario(): void {
    this.funcionarioService.fetch().subscribe((e) => this.dataSource.data = e);
  }

  public navegateToAdd(): void {
    this.route.navigate(['/funcionarios/add']).then();
  }

  public navegateToEdit(id: number): void {
    this.route.navigate(['/funcionarios/edit', id]).then();
  }

  public navegateToDelete(id: number): void {
    this.route.navigate(['/funcionarios/delete', id]).then();
  }

}
