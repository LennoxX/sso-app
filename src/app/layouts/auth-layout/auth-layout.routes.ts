import { Routes } from '@angular/router';

export const routes: Routes = [

    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {path: 'login', loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)},
];
