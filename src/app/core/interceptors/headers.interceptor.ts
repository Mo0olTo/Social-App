import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {

   const plat_id=inject(PLATFORM_ID)

  if(isPlatformBrowser(plat_id)){
    if(localStorage.getItem('socialToken')!==null){
      req=req.clone({
        setHeaders:{
          token: localStorage.getItem('socialToken') !
        }
      })
    }
  }



  return next(req);
};
