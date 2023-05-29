import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (
  route : ActivatedRouteSnapshot, 
  state) => 
{

  const router = inject(Router)

  //TODO: Implement real guard when login component is finished
  router.navigate([''])

  return true;
};
