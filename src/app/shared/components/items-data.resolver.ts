import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class ItemsDataResolver implements Resolve<ItemResolvedData> {
  private readonly _router = inject(Router);
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ItemResolvedData {
    let dta: ItemResolvedData = { isProduto: route.data.isProduto, itemID: this._router.getCurrentNavigation().extras.state?.ItemID };
    return dta;
  }
}

export type ItemResolvedData = { isProduto: boolean, itemID?: number };
