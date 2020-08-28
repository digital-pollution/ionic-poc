import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-view',
    pathMatch: 'full'
  },
  {
    path: 'camera',
    loadChildren: () => import('./camera/camera.module').then( m => m.CameraPageModule)
  },
  {
    path: 'nfc',
    loadChildren: () => import('./nfc/nfc.module').then( m => m.NfcPageModule)
  },
  {
    path: 'qr-code',
    loadChildren: () => import('./qr-code/qr-code.module').then( m => m.QrCodePageModule)
  },
  {
    path: 'list-view',
    loadChildren: () => import('./list-view/list-view.module').then( m => m.ListViewPageModule)
  },
  {
    path: 'geolocation',
    loadChildren: () => import('./geolocation/geolocation.module').then( m => m.GeolocationPageModule)
  },
  {
    path: 'push-notifications',
    loadChildren: () => import('./push-notifications/push-notifications.module').then( m => m.PushNotificationsPageModule)
  },
  {
    path: 'form-controls',
    loadChildren: () => import('./form-controls/form-controls.module').then( m => m.FormControlsPageModule)
  },
  {
    path: 'charts',
    loadChildren: () => import('./charts/charts.module').then( m => m.ChartsPageModule)
  },
  {
    path: 'network',
    loadChildren: () => import('./network/network.module').then( m => m.NetworkPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
