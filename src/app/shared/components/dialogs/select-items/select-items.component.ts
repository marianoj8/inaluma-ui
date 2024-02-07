import { Component, ElementRef, OnInit, ViewChild, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Observable, debounceTime, map, of, switchMap, tap } from "rxjs";
import { Item, ItemCarrinho } from "src/app/core/model";
import { ItemsService } from "src/app/shared/services/items.service";

@Component({
  selector: 'app-select-items',
  templateUrl: './select-items.component.html'
})
export class SelectItemsDialogComponent implements OnInit {
  /* DEPENDENCIES */
  private readonly _diagRef = inject<MatDialogRef<SelectItemsDialogComponent>>(MatDialogRef);
  private readonly _itemsService = inject(ItemsService);
  private readonly _formBuilder = inject(FormBuilder);

  /* MEMBERs */
  @ViewChild('items', {read: ElementRef<HTMLElement>, static: true}) itemsWrapper: ElementRef<HTMLElement>;

  private readonly _tipoItem = {
    todos: {val: -1, display: 'Todos'},
    produtos: {val: 0, display: 'Produtos'},
    servicos: {val: 1, display: 'Servicos'}
  };

  public publicItems: Observable<Item[]>;
  private _items: Item[];
  private selectedItems: Item[];
  public filterForm: FormGroup;

  constructor() {
    this.filterForm = this._formBuilder.group({
      tipoItem: new FormControl<number>(null),
      search: new FormControl<string>(null)
    });

    this.filterForm.get('tipoItem').valueChanges.subscribe(val => {
      if(val === -1) this._fetchItems();
      else if(val === 0) this._fetchProducts();
      else if(val === 1) this._fetchServices();
    })

    this.filterForm.get('search').valueChanges.pipe(debounceTime(250)).subscribe(this._filter);
  }

  ngOnInit(): void {
    this._fetchItems();
  }

  private _filter(par) {
    console.log(par);
  }

  private _fetchItems(): void {
    this._getItems(true).pipe(
      switchMap(prods => {
        this._items = prods;
        return this._getItems(false);
      })
    ).subscribe(servs => { this._updatePublicItems(this._items = new Array(...this._items, ...servs)); });
  }
  private _fetchProducts(): void { this._getItems(true).subscribe(prods => { this._updatePublicItems(this._items = prods); }); }
  private _fetchServices(): void { this._getItems(false).subscribe(servs => { this._updatePublicItems(this._items = servs); }); }

  public get tipoItem() { return Object.values(this._tipoItem); }
  private _updatePublicItems(items: Item[]): void {
    console.log(items);
    this.publicItems = of(items).pipe(tap(() => { this.itemsWrapper.nativeElement.scrollTo({behavior: 'smooth', top: 0}) }));
  }
  private _getItems(isProduto): Observable<Item[]> { return this._itemsService.fetch(isProduto); }
  public cancelar() { this._close(false); }
  public confirmar() { this._close(true)}
  private _close(confirmar: boolean) { this._diagRef.close(confirmar ? this.selectedItems : null); }
  public select(item: Item): void { this.selectedItems.push(item); }
  public remove(item: Item): void { this.selectedItems.splice(this.selectedItems.indexOf(item), 1); }
}
