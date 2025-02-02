import { Routes } from '@angular/router';
import { LoggedInLayoutComponent } from './logged-in-layout.component';

export const routes: Routes = [

    {path: '', component: LoggedInLayoutComponent, loadChildren: () => import('./pages/home/home.routes').then(m => m.routes)},
    {path: 'aplicacoes', component: LoggedInLayoutComponent, loadChildren: () => import('./pages/aplicacoes/aplicacoes.routes').then(m => m.routes)},
];
