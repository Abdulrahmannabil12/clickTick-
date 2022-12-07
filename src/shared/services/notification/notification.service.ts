import { Injectable } from "@angular/core";

import { ToastContainerDirective, ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  toastContainer: ToastContainerDirective;
  constructor(public toastr: ToastrService) { }
  ngOnInit() {
    this.toastr.overlayContainer = this.toastContainer;
  }
  showSuccess(message, title) {
    this.toastr.success(message, title);
  }

  showError(message, title) {
    this.toastr.error(message, title);
  }

  showInfo(message, title) {
    this.toastr.info(message, title);
  }

  showWarning(message, title) {
    this.toastr.warning(message, title);
  }
}
