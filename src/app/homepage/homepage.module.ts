import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomeIndexComponent } from './home-index/home-index.component';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [HomeIndexComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    LayoutModule,
  ],
})
export class HomepageModule { }
