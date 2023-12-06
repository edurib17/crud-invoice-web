import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';


export interface InvoiceElement {
  id: string;
  client: string;
  date: Date;
  description: string;
  invoiceNumber: string;
  total: number;
}

@Component({
  selector: 'app-list-screen',
  templateUrl: './list-screen.component.html',
  styleUrls: ['./list-screen.component.css']
})
export class ListScreenComponent implements OnInit {

  constructor(private api: ApiService,  private toastr: ToastrService,) { }

  displayedColumns: string[] = ['invoiceNumber', 'client','date', 'description', 'total', 'action'];
  invoices: InvoiceElement[] = []

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.api.getAllInvoices().subscribe((res)=>{
      this.invoices = res
    })
  }

  deleteInvoice(id: string): void {
    this.api.deleteInvoice(id).subscribe(
      (resultData: any) => {
        this.toastr.success('Nota excluída com sucesso!', '', {
          timeOut: 1000,
        });
        this.getAll()
      },
      (error) => {
        this.toastr.error(
          'Ocorreu um erro ao deletar a nota. Tente novamente.',
          '',
          {
            timeOut: 5000,
          }
        );
      }
    );
  }

}
