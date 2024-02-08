import { HttpClient, HttpEvent, HttpEventType } from "@angular/common/http";
import { EventEmitter, Injectable, inject } from "@angular/core";
import { ImageFile } from "src/app/core/model/dto/ImageFile";
import { environment } from "src/environments/environment";
import { API_FILES_ROUTES, API_SERVICES_ROUTES } from "../config";
import { Observable, from, fromEvent, map, switchMap, tap } from "rxjs";
import { Item } from "src/app/core/model";

@Injectable()
export class FilesService {
  /* DEPENDENCIES */
  private readonly _http = inject(HttpClient);

  /* MEMBERS */
  public readonly emitStatusUploader = new EventEmitter<HttpEvent<HttpEventType.UploadProgress>>();

  // File upload
  private _uploadFile(itemId: number, file: ImageFile, path: API_FILES_ROUTES) {
    const dta = this._appendFormData(file.file);

    return this._http.post<HttpEventType.UploadProgress>(`${environment.API+path+itemId}`, dta, {
      reportProgress: true,
      observe: 'events'
    }).pipe(tap(v => { this.emitStatusUploader.emit(v) }));
  }

  public uploadImage(img: ImageFile, itemId: number, isProduto: boolean) {
    const path = isProduto ? API_FILES_ROUTES.putPostProdutos : API_FILES_ROUTES.putPostServicos;

    return this._uploadFile(itemId, img, path);
  }

  public updateImage$(item: Item, imageFile: ImageFile) {
    const path = item.isProduto ? API_FILES_ROUTES.putPostProdutos : API_FILES_ROUTES.putPostServicos;
    const endpoint = environment.API+path+item.id;

    return this._http.put(endpoint, this._appendFormData(imageFile.file));
  }

  public async getImage(itemID: number, isProduto: boolean) {
    const path = isProduto ? API_FILES_ROUTES.getProdutos : API_FILES_ROUTES.getServicos;
    const endpoint = environment.API+path+itemID;

    const res = await fetch(endpoint);
    const blob = await res.blob()

    return blob;
  }

  public getImage$(item: Item): Observable<Item> {
    const path = item.isProduto ? API_FILES_ROUTES.getProdutos : API_FILES_ROUTES.getServicos;
    const endpoint = environment.API+path+item.id;

    return this._http.get(endpoint, {responseType: 'blob'}).pipe(
      switchMap(blob => {
        const fr = new FileReader();
        const obs$ = fromEvent(fr, 'load').pipe(
          map((res: any) => {
            item.imgSrc = res.target.result;
            return item;
          })
        );

        fr.readAsDataURL(blob);

        return obs$;
      })
    );
  }

  private _appendFormData(file: File): FormData {
    const formData = new FormData();
    formData.append(API_FILES_ROUTES.key, file);

    return formData;
  }
}
