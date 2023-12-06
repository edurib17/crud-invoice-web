import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'http://localhost:8081/v1/invoices';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
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

  getInvoice(id:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`)
  }

  saveInvoice(invoice: any): Observable<any> {
   return this.http[invoice.id ? 'put' : 'post'](`${this.apiUrl}`, invoice, { responseType: 'text' })
  }

  deleteInvoice(id: string): Observable<any>{
   return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
