import { Routes } from '@angular/router';
import { Index } from './pages/index';
import { Cadastro } from './pages/cadastro/cadastro';
import { Login } from './pages/login/login';

export const routes: Routes = [
    { path: 'index', component: Index },
    { path: 'cadastro', component: Cadastro },
    { path: 'login', component: Login },
    { path: '', redirectTo: 'index', pathMatch: 'full' }
];
