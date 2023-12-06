import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'http://localhost:8081/v1/invoices';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  getAllInvoices(): Observable<any> {
    return this.http.get(`${this.apiUrl}`).pipe(
      catchError((error) => {
        this.toastr.error('Ocorreu um erro ao obter as notas fiscais. Tente novamente.', '', {
          timeOut: 5000,
        });
        throw error;
      })
    );
  }

  createInvoice(invoice: any): void {
    this.http
      .post(`${this.apiUrl}`, invoice, { responseType: 'text' })
      .subscribe(
        (resultData: any) => {
          this.toastr.success('Nota salva com sucesso!', '', {
            timeOut: 1000,
          });
        },
        (error) => {
          this.toastr.error(
            'Ocorreu um erro ao salvar a nota. Tente novamente.',
            '',
            {
              timeOut: 5000,
            }
          );
        }
      );
    this.getAllInvoices();
    this.router.navigate(['/']);
  }
}
