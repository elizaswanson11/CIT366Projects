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
          // set editMode to true
          this.editMode = true;
          // this.document = clone of this.originalDocument (parse
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        }
      );
  }

  onSubmit(form: NgForm) {
  //   values = form.value // get values from form’s fields
    const values = form.value;
    const newDocument = new Document('1', values.name, values.description, values.imageUrl, null);
    if (this.editMode = true) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    };
  //   route back to the '/documents' URL
    this.router.navigate(['/documents'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['/documents'], { relativeTo: this.route });
  }

}
