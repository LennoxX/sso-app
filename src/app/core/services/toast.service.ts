import { Injectable } from '@angular/core';

import swal from 'sweetalert2';
import { ApiError } from '../model/apierror.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor() { }

  showSuccessMessage(message?: string) {
    swal.fire({
      toast: true,
      titleText: 'Sucesso',
      text: message != null ? message : 'Solicitação processada com sucesso!',
      width: '350px',
      icon: 'success',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
      position: 'bottom-end',
    });
  }

  showErrorMessage(apiError?: ApiError) {
    swal.fire({
      toast: true,
      titleText: 'Erro',
      text: getErrorMessage(apiError),
      width: '350px',
      icon: 'error',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
      position: 'bottom-end',
    });
  }

  showCommonErrorMessage(errorMessage: string) {
    swal.fire({
      toast: true,
      titleText: 'Erro',
      text: errorMessage,
      width: '350px',
      icon: 'error',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
      position: 'bottom-end',
    });
  }

  showWarningMessage(message?: string) {
    swal.fire({
      toast: true,
      titleText: 'Atenção',
      text: message != null ? message : 'Atenção!',
      width: '350px',
      icon: 'warning',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
      position: 'bottom-end',
    });
  }

  showPopUp(message: string | undefined, title: string | undefined) {
    swal.fire(
      title,
      message,
      'info'
    );
  }

}
function getErrorMessage(apiError: ApiError | undefined): string | undefined {
  if (apiError?.message != null) {
    return apiError.message;
  } else if (apiError?.errors != null) {
    return apiError.errors;
  } else {
    return 'Erro ao processar sua solicitação!';
  }


}

