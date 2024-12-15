import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "./guards/auth.guard";

const routes: Routes = [
    {
        path: 'private',
        loadChildren: () => import('./private/private.module').then(m => m.PrivateModule)
    },
    {
        path: '**',
        redirectTo: 'private',
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}