import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      1,
      "Eliza Swanson",
      "Description of Eliza",
      'URL',
      null),
    new Document(
      1,
      "Jason Jensen",
      "Description of Jason",
      'URL',
      null),
    new Document(
      1,
      "Lydia Swanson",
      "Description of Lydia",
      'URL',
      null),
    new Document(
      1,
      "Abigail Swanson",
      "Description of Abigail",
      'URL',
      null)
  ]

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

  constructor() { }

  ngOnInit() {
  }

}
