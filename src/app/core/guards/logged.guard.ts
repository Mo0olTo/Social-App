import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  const plat_id=inject(PLATFORM_ID)
  const router=inject(Router)

 if(isPlatformBrowser(plat_id)){
  if(localStorage.getItem('socialToken')!== null){
    router.navigate(['/home'])
    return false;

  }else{
    
    return true
  }
 } else{
  return false
 }



 
};
