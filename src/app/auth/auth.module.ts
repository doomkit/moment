import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { MasterGuard } from './guards/master.guard';
import { NtMasterGuard } from './guards/nt-master.guard';

@NgModule({
  providers: [
    AuthService,
		AuthGuard,
		AdminGuard,
		MasterGuard,
		NtMasterGuard
  ]
})
export class AuthModule { }
