import { inject } from "@angular/core";
import { CanActivate, CanActivateFn, Router } from "@angular/router";
import { UserService } from "../services/user/user.service";

export const authGuard : CanActivateFn = ()=> {
  const auth = inject(UserService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/sign-in']);
    return false;
  }
}