import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "../documents.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Document} from "../document.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  document: Document;
  originalDocument: Document;
  editMode: boolean = false;

  constructor(private documentService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          // id = value of id parameter in params list
          const id = params['id'];
          // if id parameter is undefined or null then set editMode to false
          if (!id) {
            this.editMode = false;
            return;
          }

          this.originalDocument = this.documentService.getDocument(id)
          if (!this.originalDocument) {
            return;
          }
          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        }
      );
  }

  onSubmit(form: NgForm) {
  //   values = form.value // get values from form’s fields
    let newDocument = new Document(String(this.documentService.getMaxId()), form.value.name, form.value.description, form.value.url, null);
    if (this.editMode === true) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    };
  //   route back to the '/documents' URL
    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

}
