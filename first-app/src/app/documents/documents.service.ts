import { Injectable, Output, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import { Subject } from "rxjs/Subject";
import 'rxjs/Rx' ;
import { Http } from "@angular/http";
import { Response } from "@angular/http";
import {init} from "protractor/built/launcher";

@Injectable()
export class DocumentsService {

  maxDocumentId: number;

  documents: Document[] = [];

  @Output() documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();
  @Output() documentChangedEvent: EventEmitter<Document[]> = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: Http) {
    this.initDocuments();
  }

  initDocuments() {
    return this.http.get('https://angular-and-nodejs.firebaseio.com/documents.json')
    .map(
      (response: Response) => {
        const data = response.json();
        return data;
      }
    ).subscribe((documentsReturned: Document[]) => {
      this.documents = documentsReturned;
      this.maxDocumentId = this.getMaxId();
      this.documentListChangedEvent.next(this.documents.slice());
    })
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
                 updatedDocument: Document) {
    if (!originalDocument) {
      return;
    }

    var pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    updatedDocument.id = originalDocument.id;
    this.documents[pos] = updatedDocument;
    this.documentListChangedEvent.next(this.getDocuments());
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    var pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents);
  }



}
