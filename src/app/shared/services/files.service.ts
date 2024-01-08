import { HttpClient, HttpEvent, HttpEventType } from "@angular/common/http";
import { EventEmitter, Injectable, inject } from "@angular/core";
import { ImageFile } from "src/app/core/model/dto/ImageFile";
import { environment } from "src/environments/environment";
import { API_FILES_ROUTES, API_SERVICES_ROUTES } from "../config";
import { tap } from "rxjs";

@Injectable({ providedIn: 'root' })
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
    const path = isProduto ? API_FILES_ROUTES.postProdutos : API_FILES_ROUTES.postServicos;

    return this._uploadFile(itemId, img, path);
  }

  private _appendFormData(file: File): FormData {
    const formData = new FormData();
    formData.append(API_FILES_ROUTES.key, file);

    return formData;
  }
}
