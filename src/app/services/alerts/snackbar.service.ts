import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
private snackBar = inject(MatSnackBar)

  openSuccess(message: string) {
    this.openSnackBar(message, 'success-snackbar');
  }

  openError(message: string) {
    this.openSnackBar(message, 'error-snackbar');
  }

  openInfo(message: string) {
    this.openSnackBar(message, 'info-snackbar');
  }

  private openSnackBar(message: string, panelClass: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1500;
    config.verticalPosition = 'top';
    config.horizontalPosition = 'end'
    config.panelClass = [panelClass];

    this.snackBar.open(message, undefined, config);
  }
}
