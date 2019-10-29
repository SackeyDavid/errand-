import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LoadingComponent } from './loading/loading.component';
import { MapComponent } from './map/map.component'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [LoadingComponent, MapComponent],
  exports: [LoadingComponent, MapComponent]
})
export class ShareModule {}
