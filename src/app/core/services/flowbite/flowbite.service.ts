import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

declare function initFlowbite(): void;

@Injectable({
  providedIn: 'root'
})
export class FlowbiteService {

 
  
  loadFlowbite(callback?: () => void): void {
    try {
      initFlowbite();
      if (callback) callback();
    } catch (err) {
      console.error('Flowbite init error:', err);
    }
  }
}
