import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Item } from "src/app/core/model";

@Injectable()
export class SelectItemsService {
  private readonly serviceSelectionStateSource: Subject<IItemResponse>;
  public readonly serviceSelectionStateRequestedSource: Subject<Item>;
  private readonly itemSelectionStateRequestedSource: Subject<Item>;
  private readonly itemSelectionStateSource: Subject<IItemResponse>;
  public readonly itemSelectionState$: Observable<IItemResponse>;
  public readonly itemSelectionStateRequested$: Observable<Item>;
  public readonly serviceSelectionState$: Observable<IItemResponse>;
  public readonly serviceSelectionStateRequested$: Observable<Item>;

  constructor() {
    this.serviceSelectionStateRequestedSource = new Subject();
    this.itemSelectionStateRequestedSource = new Subject();
    this.serviceSelectionStateSource = new Subject();
    this.itemSelectionStateSource = new Subject();
    this.itemSelectionState$ = this.itemSelectionStateSource.asObservable()
    this.serviceSelectionState$ = this.serviceSelectionStateSource.asObservable();
    this.itemSelectionStateRequested$ = this.itemSelectionStateRequestedSource.asObservable();
    this.serviceSelectionStateRequested$ = this.serviceSelectionStateRequestedSource.asObservable();
  }

  public requestItemSelectionState(item: Item): void {
    this.itemSelectionStateRequestedSource.next(item);
  }

  public requestServiceSelectionState(service: Item): void {
    this.serviceSelectionStateRequestedSource.next(service);
  }

  public respondServiceSelectionState(response: IItemResponse): void {
    this.serviceSelectionStateSource.next(response);
  }

  public respondItemSelectionState(response: IItemResponse): void {
    this.itemSelectionStateSource.next(response);
  }
}

export interface IItemResponse { item: Item, isSelected: boolean, isServicoSelected: boolean, temServico: boolean }
