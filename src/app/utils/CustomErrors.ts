
import { inject } from '@angular/core';
import { ApiResponse } from '../interfaces/genericresponse';
import { SnackbarService } from '../services/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';



export class CustomErrors<T>{
    private snackBar = inject(SnackbarService);
    
    message: string| undefined;
    

    public handleResponse(response: ApiResponse<T>): void {
        const code = parseFloat(response.metaData[0]?.code || '0');
        if (this.isValidResponse(response, code)) {
          this.handleSuccessfull(response);
        } else {
          this.handleUnsuccessfull(response);
        }
      }
    
      private isValidResponse(response: ApiResponse<T>, code: number): boolean {
        return response.metaData && response.metaData.length > 0 && !isNaN(code) && code >= 20 && code <= 29;
      }

      private handleSuccessfull(response: ApiResponse<T>): void {
    
        if (response.objectList) {          
          this.message = response.metaData[0]?.type;
          this.snackBar.openSuccess(this.message);
        }
      }
    
      private handleUnsuccessfull(response: ApiResponse<T>): void {
        this.snackBar.openInfo(response.metaData[0]?.type || 'Error desconocido');
      }


      public handleError(error: any): void {
        if (error instanceof HttpErrorResponse && error.error) {
          const apiResponse = error.error as ApiResponse<T>;
    
          if (apiResponse.metaData && apiResponse.metaData.length > 0) {
            const customErrorMessage = apiResponse.metaData[0]?.type || 'Error desconocido';
            this.snackBar.openError(customErrorMessage);
            return;
          }
        }
    
        // Si no es un error de ApiResponse esperado, muestra el mensaje de error HTTP predeterminado
        this.snackBar.openError(error.message || 'Error desconocido');
      }
}