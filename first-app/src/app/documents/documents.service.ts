import { Injectable, Output, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS} from "./MOCKDOCUMENTS";
import {Subject} from "rxjs/Subject";

@Injectable()
export class DocumentsService {

  maxDocumentId: number;

  documents: Document[] = [];

  @Output() documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();
  @Output() documentChangedEvent: EventEmitter<Document[]> = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents.filter((document: Document)=> {
      return document.id === id;
    })[0] || null;
  }
  //
  // deleteDocument(document: Document) {
  //   if (document === null) {
  //     return;
  //   }
  //   const pos = this.documents.indexOf(document);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.documents.splice(pos, 1);
  //   this.documentChangedEvent.emit(this.documents.slice());
  // }

  getMaxId() {
    var maxId = 0;
    for (var i = 0; i < this.documents.length; i++) {
      var currentId = +this.documents[i].id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    //if newDocument is undefined or null then return
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    //push newDocument onto the documents list
    this.documents.push(newDocument);
    this.documentListChangedEvent.next(this.documents.slice());
    // documentsListClone = documents.slice()
    // documentListChangedEvent.next(documentsListClone)
  }

  updateDocument(originalDocument: Document,
                 newDocument: Document) {
    if (!originalDocument) {
      return;
    }

    var pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    var documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);

  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    var pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents = this.documents.splice(pos, 1);
    var documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }


}
