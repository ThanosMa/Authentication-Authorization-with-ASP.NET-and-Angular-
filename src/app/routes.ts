import { Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { AdminPanelComponent } from "./components/admin-panel/admin-panel.component";
import { ForbiddenComponent } from "./components/forbidden/forbidden.component";
import { HomeComponent } from "./components/home/home.component";
import { ProductComponent } from "./components/user/product/product.component";
import { SignInComponent } from "./components/user/sign-in/sign-in.component";
import { SignUpComponent } from "./components/user/sign-up/sign-up.component";
import { UserComponent } from "./components/user/user.component";

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },
    { path: 'forbidden', component: ForbiddenComponent,canActivate:[AuthGuard] },
    { path: 'adminPanel', component: AdminPanelComponent,canActivate:[AuthGuard], data:{roles:['Admin']} },
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'Product', component: UserComponent,canActivate:[AuthGuard],
        children: [{ path: '', component: ProductComponent }]
    },
    { path : '', redirectTo:'/login', pathMatch : 'full'}
    
];