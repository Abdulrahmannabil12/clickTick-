import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn:'any',
})
export class SnackBarService {
  private matSnackBarConfig: MatSnackBarConfig = {};
  constructor(private snackBar: MatSnackBar, private ngZone: NgZone) {
    this.setSnackBarConfig();
  }

  private setSnackBarConfig(): void {
    this.matSnackBarConfig = new MatSnackBarConfig();
    this.matSnackBarConfig.verticalPosition = 'bottom';
    this.matSnackBarConfig.horizontalPosition = 'center';
    this.matSnackBarConfig.duration = 2000;
  }

  successMessage(message: string): void {
    this.ngZone.run(() => {
      this.setSnackBarConfig();
      this.matSnackBarConfig.panelClass = ['snack-success'];
      this.snackBar.open(message, '', this.matSnackBarConfig);
    });
  }

  showError(message: string): void {
    this.ngZone.run(() => {
      this.setSnackBarConfig();
      this.matSnackBarConfig.panelClass = ['snack-error'];
      this.snackBar.open(message, 'Close', this.matSnackBarConfig);
    });
  }
}
