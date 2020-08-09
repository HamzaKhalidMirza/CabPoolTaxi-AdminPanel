import { TopNavComponent } from 'src/app/shared/nav/top-nav/top-nav.component';
import { SideNavComponent } from 'src/app/shared/nav/side-nav/side-nav.component';
import { ImagePickerComponent } from './pickers/image-picker/image-picker.component';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
      SideNavComponent,
      TopNavComponent,
      ImagePickerComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    exports: [
      SideNavComponent,
      TopNavComponent,
      ImagePickerComponent
    ],
    entryComponents: [],
    providers: []
  })
  export class SharedModule {}
