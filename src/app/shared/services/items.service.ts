import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment";
import { API_PRODUTOS_ROUTES, API_SERVICES_ROUTES, Operation } from "../config";
import { Item, ItemDTO } from "src/app/core/model/dto/ItemDTO";
import { Observable, Subscription, from, map, mergeAll, switchMap, tap } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { FilesService } from "./files.service";

@Injectable()
export class ItemsService {
  /* DEPENDENCIES */
  private readonly _http = inject(HttpClient);
  private readonly _toastrService = inject(ToastrService);
  private readonly _filesService = inject(FilesService);

  /* MEMBERS */
  private readonly _noImagePath = 'http://localhost:4200/assets/images/no_image.svg';

  public fetch(isProduto: boolean) {
    return transformarDTOs(this._fetchItem(this._getPath(isProduto, Operation.fetch)), isProduto);
  }

  public getItemByID(id: number, isProduto: boolean) {
    return transformarDTO(this._getItemByID(id, this._getPath(isProduto, Operation.get)), isProduto);
  }

  public getItemByID$(item: Item): Observable<Item>;
  public getItemByID$(id: number, isProduto: boolean): Observable<Item>;
  public getItemByID$(p1: Item | number, p2?: boolean): Observable<Item> {
    let item$: Observable<Item>;

    item$ = (typeof p1 === 'number')
      ? transformarDTO(this._getItemByID(p1, this._getPath(p2, Operation.get)), p2)
      : transformarDTO(this._getItemByID(p1.id, this._getPath(p1.isProduto, Operation.get)), p1.isProduto);

    return item$.pipe(switchMap(itm => this._filesService.getImage$(itm)));
  }

  public registerItem(item: ItemDTO, isProduto: boolean) {
    return transformarDTO(this._saveItem(item, this._getPath(isProduto, Operation.post)), isProduto).pipe(
      tap(() => { this.mostrarFeedback('Item cadastrado com successo') })
    );
  }
  public updateItem(item: ItemDTO, isProduto: boolean) {
    return transformarDTO(this._updateItem(item, this._getPath(isProduto, Operation.put)), isProduto).pipe(
      tap(() => { this.mostrarFeedback('Item actualizado com sucesso') })
    );
  }
  public deleteItemByID(idItem: number, isProduto: boolean) {
    return this._deleteItemByID(idItem, this._getPath(isProduto, Operation.delete)).pipe(
      tap(() => { this.mostrarFeedback('Item eliminado com sucesso')})
    );
  }

  // Métodos internos
  private _fetchItem(path: string) { return this._http.get<ItemDTO[]>(path); }
  private _getItemByID(itemID: number, path: string) { return this._http.get<ItemDTO>(path+itemID); }
  private _saveItem(item: ItemDTO, path: string) { return this._http.post<ItemDTO>(path, item); }
  private _updateItem(item: ItemDTO, path: string) { return this._http.put<ItemDTO>(path, item); }
  private _deleteItemByID(itemId: number, path:string) { return this._http.delete<void>(path+itemId)}

  private _getPath(isProduto: boolean, operation: Operation): string {
    let path = environment.API;

    switch (operation) {
      case Operation.fetch:
        path += isProduto ? API_PRODUTOS_ROUTES.fetch : API_SERVICES_ROUTES.fetch;
        break;
      case Operation.get:
        path += isProduto ? API_PRODUTOS_ROUTES.getByID : API_SERVICES_ROUTES.getByID;
        break;
      case Operation.post:
        path += isProduto ? API_PRODUTOS_ROUTES.create : API_SERVICES_ROUTES.create;
        break;
      case Operation.delete:
        path += isProduto ? API_PRODUTOS_ROUTES.deleteByID : API_SERVICES_ROUTES.deleteByID
        break;
      case Operation.put:
        path += isProduto ? API_PRODUTOS_ROUTES.update : API_SERVICES_ROUTES.update;
        break;
    }

    return path;
  }

  private mostrarFeedback(msg: string): void { this._toastrService.success(msg, 'Successo'); }

  public getNoImage(): Observable<File> { return this._http.get(this._noImagePath, {responseType: 'blob'}).pipe(map(b => new File([b], 'no_name', {type: b.type}))) }

  fetch$(isProduto: boolean): Observable<Item[]> {
    return this.fetch(isProduto).pipe(tap(arr => {
      from(arr).pipe(
        map( i => this._filesService.getImage$(i)),
        mergeAll()
      ).subscribe();
    }))
  }
}

const transformarDTO = (obs$: Observable<ItemDTO>, isProduto: boolean) => { return obs$.pipe(map(i =>  new Item(i, isProduto))) }
const transformarDTOs = (obs$: Observable<ItemDTO[]>, isProduto: boolean) => { return obs$.pipe(map(itens => itens.map(i => new Item(i, isProduto)))) }
