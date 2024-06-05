import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Storage } from '@ionic/storage-angular';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    FormsModule,
  ],
  declarations: [Tab2Page],
})
export class Tab2PageModule {
  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
  }
}
