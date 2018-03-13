import { Component, OnInit} from '@angular/core';
import { Document } from '../document.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DocumentsService} from "../documents.service";
import {WindRefService} from "../../wind-ref.service";
//import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  id: string;
  document: Document;
  nativeWindow: any;
  // paramsSubscription = Subscription;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private documentService: DocumentsService,
              private windRefService: WindRefService) {
    this.nativeWindow = windRefService.getNativeWindow();
  }

  ngOnInit() {
   // this.router.navigate(['servers'], {relativeTo: this.route});
   // this.user = {
   //   id: this.route.snapshot.params['id'],
   //   name: this.route.snapshot.params['name']

    //    this.paramsSubscription =
    this.route.params
     .subscribe(
     (params: Params) => {
            this.id = params['id'];
            this.document = this.documentService.getDocument(this.id);
         }
     );
  }
  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }
  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents'], { relativeTo: this.route });

}
  // ngOnDestroy() {
  //   this.paramsSubscription.unsubscribe();
  // }


}
