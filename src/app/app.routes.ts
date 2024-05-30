import { Routes } from '@angular/router';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: "full" },
    {
        path: 'home', loadComponent: () => import('./components/home/home.component').then(
            x => x.HomeComponent
        )
    },
    {
        path: 'login', loadComponent: () => import('./components/login/login.component').then(
            x => x.LoginComponent
        )
    },
    {
        path: 'alta-repartidor', loadComponent: () => import('./components/alta-repartidor/alta-repartidor.component').then(
            x => x.AltaRepartidorComponent
        )
    },

    {
        path: '**', loadComponent: () => import('./components/page-not-found/page-not-found.component').then(
            x => x.PageNotFoundComponent
        )
    },
];
