import { Routes } from '@angular/router';
import { SignComponent } from './comp/sign/sign.component';
import { ProductsListComponent } from './comp/products-list/products-list.component';
import { ProductDetailsComponent } from './comp/products-list/product-details/product-details.component';
import { AddprodComponent } from './comp/dashboard/addprod/addprod.component';
import { DashboardComponent } from './comp/dashboard/dashboard.component';
import { EditprodComponent } from './comp/dashboard/editprod/editprod.component';
import { authGuard } from './guard/auth.guard';
import {authAdminGuard} from './guard/auth-admin.guard'
import { CartComponent } from './comp/cart/cart.component';

export const routes: Routes = [
    { path: 'product', component: ProductsListComponent , canActivate:[authGuard]},
    { path: 'product/:id', component: ProductDetailsComponent, canActivate:[authGuard] },
    { path: 'cart' ,component :CartComponent},
    { path: 'editProduct/:id', component: EditprodComponent , canActivate:[authAdminGuard] },
    { path: '', component: SignComponent },
    { path: 'addprod', component: AddprodComponent ,canActivate:[authAdminGuard]},
    { path: 'dashboard' ,component:DashboardComponent,canActivate:[authAdminGuard]}
];
