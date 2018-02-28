import {Component, Injectable, OnInit} from '@angular/core';
import { DocumentsService } from './documents.service';
import {Document} from "./document.model";
import {Contact} from "../contacts/contact.model";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [DocumentsService]
})

@Injectable()
export class DocumentsComponent implements OnInit {
  selectedDocument: Document = null;
  constructor(private documentsService: DocumentsService) { }

  ngOnInit() {
    this.documentsService.documentSelectedEvent.subscribe((document: Document) => {
      this.selectedDocument = document;
    });
  }

}
