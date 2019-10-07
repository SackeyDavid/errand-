import { Component, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  @ViewChild(IonSegment, {static: false}) ionSegment: IonSegment;

  constructor(private router: Router, private cf: ChangeDetectorRef) {
    // this.ionSegment.value = "nearby";
  }

  
  
  onGoToShopSinglePage() {
    this.router.navigate(['/shop-single']);
  }
}
