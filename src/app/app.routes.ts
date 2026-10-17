import { Routes } from '@angular/router';
import { Index } from './pages/index';
import { CadastroUser } from './pages/cadastro/org-resp/cadastro-user';
import { Login } from './pages/login/login';

export const routes: Routes = [
    { path: 'index', component: Index },
    { path: 'cadastro-user', component: CadastroUser },
    { path: 'login', component: Login },
    { path: '', redirectTo: 'index', pathMatch: 'full' }
];
