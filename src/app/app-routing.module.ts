import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterHomeComponent } from './pages/master-home/master-home.component';
import { MasterPaymentComponent } from './pages/master-payment/master-payment.component';

const routes: Routes = [
  { path: '', component: MasterHomeComponent },
  { path: 'payment', component: MasterPaymentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
