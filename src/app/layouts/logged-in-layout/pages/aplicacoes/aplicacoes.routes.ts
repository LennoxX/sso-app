import { Routes } from '@angular/router';

export const routes: Routes = [

    {path: '', loadComponent: () => import('./aplicacoes.component').then(c => c.AplicacoesComponent)},
];
