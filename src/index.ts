import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolePermissions } from './role-permissions';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ RolePermissions ],
  exports:      [ RolePermissions ]
})
export class RolePermissionsModule { }