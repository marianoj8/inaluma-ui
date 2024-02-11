import { Component, ElementRef, OnInit, ViewChild, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Observable, Subject, debounceTime, map, of, switchMap, tap } from "rxjs";
import { CarrinhoService } from "src/app/core/components/carrinho/carrinho.service";
import { Item } from "src/app/core/model";
import { ItemsService } from "src/app/shared/services/items.service";
import { SelectItemsService } from "./select-items.service";

@Component({
  selector: 'app-select-items',
  templateUrl: './select-items.component.html'
})
export class SelectItemsDialogComponent implements OnInit {
  /* DEPENDENCIES */
  private readonly _diagRef = inject<MatDialogRef<SelectItemsDialogComponent>>(MatDialogRef);
  private readonly _itemsService = inject(ItemsService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _toastrService = inject(ToastrService);
  private readonly _carrinhoService = inject(CarrinhoService);
  private readonly _selectItemsService = inject(SelectItemsService);

  /* MEMBERs */
  @ViewChild('items', {read: ElementRef<HTMLElement>, static: true}) itemsWrapper: ElementRef<HTMLElement>;
  public readonly VIEW_MODES = VIEW_MODES;
  private _currViewMode = VIEW_MODES.row;
  public publicItemsSource: Subject<Item>;
  public publicItems$: Observable<Item[]>;
  private _isServicoSelected: boolean;
  private _items: Item[];
  private _selectedItems: Item[];
  public filterForm: FormGroup;
  private readonly _tipoItem: {[key: string]: {val: number, display: string}};

  constructor() {
    this._selectedItems = new Array();
    this._isServicoSelected = false;

    this._tipoItem = {
      todos: {val: -1, display: 'Todos'},
      produtos: {val: 0, display: 'Produtos'},
      servicos: {val: 1, display: 'Servicos'},
      selecionados: {val: 2, display: 'Selecionados'}
    }

    this.filterForm = this._formBuilder.group({
      tipoItem: new FormControl<number>(this._tipoItem.todos.val),
      search: new FormControl<string>(null)
    });

    this.filterForm.get('tipoItem').valueChanges.subscribe((val: number) => {
      if(val === this._tipoItem.todos.val) this._fetchItems();
      else if(val === this._tipoItem.produtos.val) this._fetchProducts();
      else if(val === this._tipoItem.servicos.val) this._fetchServices();
      else if(val === this._tipoItem.selecionados.val) this._sortItems(true);
    })

    this.filterForm.get('search').valueChanges.pipe(debounceTime(100)).subscribe(s =>{
      const tipoItem = this.filterForm.value.tipoItem;
      const inputArray = (tipoItem === this._tipoItem.selecionados.val) ? this._selectedItems : this._items;

      this._filter(s, inputArray);
    });

    this._selectItemsService.itemSelectionStateRequested$.subscribe(item => {
      let isSelected = false;
      let isServicoSelected = false;

      for(let i of this._selectedItems) {
        if(i.equals(item)) {
          isSelected = true;
          isServicoSelected = !i.isProduto;
          break;
        }
      }

      this._selectItemsService.respondItemSelectionState({
        item,
        isSelected,
        isServicoSelected,
        temServico: this.temServico
      });
    })

    this._selectItemsService.serviceSelectionStateRequested$.subscribe(item => {
      let isSelected = false;
      let temServico = false;
      let isServicoSelected = false;

      if(this._servico?.equals(item)) {
        isSelected = true;
        temServico = true;
        isServicoSelected = true;
      }

      this._selectItemsService.respondServiceSelectionState({
        item,
        isSelected,
        temServico,
        isServicoSelected
      });
    });
  }

  ngOnInit(): void { this._fetchItems(); }

  private _filter(searchString: string, inputArray: Item[]) {
    const filteredArray = inputArray.filter(i => {
      let matchString = '';

      i.nome.trim().split(' ').forEach(s => { matchString += s.toLowerCase() });

      matchString += i.preco.toString();
      if(i.isProduto) matchString += i.tipo?.trim().toLowerCase() ?? '';
      else {
        matchString += i.units.trim().toLowerCase() ?? '';
        matchString += i.duracao?.toString() ?? '';
      }

      let select = matchString.includes(searchString?.trim().toLowerCase() ?? '');
      searchString?.split(' ').forEach(s => { select = select || matchString.includes(s.toLowerCase()) });

      return select;
    });

    this._updatePublicItems(filteredArray);
  }

  public clearSearch(): void { this.filterForm.get('search').patchValue(''); }

  private _fetchItems(): void {
    const items = new Array<Item>();

    this._getItems(true).pipe(
      switchMap(prods => {
        items.push(...prods);
        if(this._carrinhoService.temServico) return of(null);
        else return this._getItems(false);
      })
    ).subscribe(servs => {
      this._items = servs ? new Array(...servs, ...items) :  new Array(...items);
      this._sortItems();
    });
  }

  private _fetchProducts(): void {
    this._getItems(true).subscribe(servs => {
      this._items = servs;
      this._sortItems();
    });
  }

  private _fetchServices(): void {
    this._getItems(false).subscribe(prods => {
      this._items = prods;
      this._sortItems();
    });
  }

  public get tipoItem() {
    const arr = Object.values(this._tipoItem);
    if(this._carrinhoService.temServico) arr.splice(arr.indexOf(this._tipoItem.servicos), 1);

    return arr;
  }

  private _updatePublicItems(items: Item[]): void {
    this.publicItems$ = of(items).pipe(tap(() => { this.itemsWrapper.nativeElement.scrollTo({behavior: 'smooth', top: 0}) }))
  }

  private _sortItems(onlySelected = false): void {
    let inputArray = this._items;

    if(onlySelected) inputArray = this._selectedItems;
    else {
      let ind = 0;

      for(let i  of inputArray) {
        if(this._selectedItems.includes(i)) {
          this._items.push(this._items.splice(ind++, 1)[0]);
        }
      }
    }

    this._filter(this.filterForm.value.search, inputArray);
  }

  private _getItems(isProduto: boolean): Observable<Item[]> {
    return this._itemsService.fetch$(isProduto).pipe(
      map(arr => arr.filter(i => !this._carrinhoService.estaNoCarrinho(i))),
      tap(items => { this._items = items })
    );
  }

  public cancelar() { this._close(false); }
  public confirmar() { this._close(true)}
  private _close(confirmar: boolean) { this._diagRef.close(confirmar ? this._selectedItems : null); }

  public setActive(mode: VIEW_MODES): void {
    if(this.isCurrentViewMode(mode)) return;
    this._currViewMode = mode;
  }

  public isCurrentViewMode(mode: VIEW_MODES): boolean { return mode === this._currViewMode; }
  public handleMarkItemRequested(data: {item: Item, select: boolean}) {
    let msg = `${data.item.itemTypeName} ${data.select ? 'marcado' : 'desmarcado'} com sucesso`;

    if(data.select) this._selectedItems.push(data.item);
    else this._selectedItems.splice(this._selectedItems.indexOf(data.item), 1);

    if(!data.item.isProduto) {
      this._isServicoSelected = data.select;
      this._selectItemsService.respondServiceSelectionState({
        item: data.item,
        isSelected: true,
        temServico: true,
        isServicoSelected: this._isServicoSelected = data.select
      });
    };

    this._toastrService.success(msg);
    this._sortItems();
  }

  public get selectedService(): Item {
    let service: Item = null;

    if(this._carrinhoService.temServico) service = this._carrinhoService.servico.item;
    else {
      for(let i of this._selectedItems) {
        if(!i.isProduto) {
          service = i;
          break;
        }
      }
    }

    return service;
  }

  private get _servico(): Item {
    if(!this.temServico) return null;

    let serv: Item = null;

    for (let i of this._selectedItems) {
      if(!i.isProduto) {
        serv = i;
        break;
      }
    }

    return serv;
  }

  public get temServico(): boolean { return this._isServicoSelected; }
}

enum VIEW_MODES { row, column}
