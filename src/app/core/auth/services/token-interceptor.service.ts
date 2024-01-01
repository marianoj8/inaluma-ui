import { HttpRequest, HttpErrorResponse, HttpInterceptor, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Observable, of } from "rxjs";
import { catchError, delay } from "rxjs/operators";
import { CONSTS_VARS } from "src/app/core/config/consts";
import { LostConnectionComponent } from "src/app/shared/components/lost-connection/lost-connection.component";
import { CustomDialogPostion } from "src/app/shared/model/custom-dialog-position";
import { AuthService } from "./auth.service";

export class CustomDataParams {
  request: HttpRequest<any>;
  onError: HttpErrorResponse;

  constructor(
    request: HttpRequest<any>,
    onError: HttpErrorResponse) {

    this.request = request;
    this.onError = onError;
  }
}


@Injectable({providedIn: 'root'})
export class TokenInterceptorService implements HttpInterceptor {
  private XSRFTOKEN: string;
  constructor(private authService: AuthService, private dialogService: MatDialog) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authService.sessionToken;

    if (currentUser) {
      this.XSRFTOKEN = document.cookie.replace(CONSTS_VARS.cookieXSRFTokenKey, '');

      request = request.clone({
        headers: new HttpHeaders({
          Authorization: currentUser,
          'X-XSRF-TOKEN': this.XSRFTOKEN
        })
      });
    }

    return next.handle(request)
      .pipe(catchError((onError: HttpErrorResponse) => {
        this.openLostConnectionDialog(request, onError);
        return of(onError.error);
      })
    );
  }

  private openLostConnectionDialog(request: HttpRequest<any>, errorType: HttpErrorResponse): void {

    const position = new CustomDialogPostion();
    const config = new MatDialogConfig();
    const dataParam = new CustomDataParams(request, errorType);

    if (errorType?.error?.status === 403) {
      config.height = '54%';
      config.width = '25%';
      config.position = position;
      config.hasBackdrop = true;
      config.data = dataParam;
    } else if (errorType?.error?.status === 400) {
      position.BottomLeftPosition();
      config.height = '9%';
      config.width = '35%';
      config.position = position;
      config.hasBackdrop = false;
      config.data = dataParam;

    } else {
      position.BottomLeftPosition();
      config.height = '18%';
      config.width = '35%';
      config.position = position;
      config.hasBackdrop = false;
      config.data = dataParam;
    }

    this.dialogService
      .open(LostConnectionComponent, config)
      .afterOpened()
      .pipe(delay(5000))
      .subscribe(() => {

        // No connection
        if (!((errorType?.error?.ok === undefined && errorType?.error?.status === undefined) ||
          (errorType?.error?.ok === undefined || errorType?.error?.ok === false) &&
          (errorType?.error?.status === 0 || errorType?.error?.status === 504) || errorType?.error?.status === 403)) {

          this.dialogService.closeAll();
        }
      });
  }

}
