import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


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

  constructor(private api: ApiService) { }

  displayedColumns: string[] = ['invoiceNumber', 'client','date', 'description', 'total', 'action'];
  invoices: InvoiceElement[] = []

  ngOnInit(): void {
    this.api.getAllInvoices().subscribe((res)=>{
      this.invoices = res
    })
  }

}
