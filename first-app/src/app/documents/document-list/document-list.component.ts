import {Subscription} from "rxjs/Subscription";

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from "../documents.service";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})

export class DocumentListComponent implements OnInit, OnDestroy {

  @Input() documents: Document[] = [];
  private subscription: Subscription;

  constructor(private documentsService: DocumentsService) {}

  ngOnInit() {
    this.documents = this.documentsService.getDocuments();

    this.subscription = this.documentsService.documentListChangedEvent
      .subscribe(
        (documentList: Document[]) => {
         this.documents  = documentList;
        }
      );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
