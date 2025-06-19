import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {
        path: '', component: AppComponent, 
        title: 'Home',
    },
    {
        path: 'register', component: RegisterComponent, 
        title: 'Register',
    }
];
