import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { accessGuard } from './core/guards/access.guard';

export const routes: Routes = [
    {path: '', canActivateChild: [authGuard], loadChildren: () => import('./layouts/logged-in-layout/logged-in-layout.routes').then(r => r.routes)},
    {path: 'auth', pathMatch:'prefix', canActivateChild:[accessGuard], loadChildren: () => import('./layouts/auth-layout/auth-layout.routes').then(r => r.routes)},
    
];
