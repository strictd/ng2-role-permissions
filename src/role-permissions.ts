import { Injectable } from '@angular/core';

// import { App } from '../../app';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';

export interface RoleInfo {
  id: number;
  tag: string;
  description: string;
  updated_at: string;
  created_at: string;
}

export interface ComponentInfo {
  id: number;
  tag: string;
  description: string;
  updated_at: string;
  created_at: string;
}

export interface OperationInfo {
  id: number;
  tag: string;
  description: string;
  updated_at: string;
  created_at: string;
}

export interface PermissionInfo {
  id: number;
  role_id: number;
  component_id: number;
  operation_id: number;
  rank: number;
  updated_at: string;
  created_at: string;
}

export interface UserPermissions {
  components: ComponentPermissionList;
  component_tag?: any;
  operation_tag?: any;
  role_tag?: any;
}

export interface ComponentPermissionList {
  [index: string]: ComponentPermissions;
}

export interface ComponentPermissions {
  operations: Array<number>;
  role_id: number;
  component_tag?: string;
  role_tag?: string;
}

export interface OperationPermissions {
  [index: string]: number; // index is gadget_id
}

@Injectable()
export class RolePermissions {

  static _permissionObserver: Observer<any>;
  static _permissionObserable = new Observable((observer: Observer<any>) => {
   RolePermissions._permissionObserver = observer; // Assign to static RolePermissions._permissionObserver
  }).share();

  p: UserPermissions = {components: {}};

  constructor() {

    RolePermissions._permissionObserable.subscribe((data: any) => { return; });
    this.p = this.currentPermissions();

  }

  currentPermissions() {
    let sP = localStorage.getItem('strictPermission');
    if (sP !== undefined && sP !== null && sP !== 'null') { return JSON.parse(sP); }

    return <UserPermissions>{components: {}}; // </UserPermissions>
  }

  savePermissions() {
    localStorage.setItem('strictPermission', JSON.stringify(this.p));
  }

  resetPermissions() {
    localStorage.removeItem('strictPermission');
    this.p = this.currentPermissions();
  }

  /* fetchComponentPermission(component_ids: any): Observable<any> {
    if (typeof component_ids === 'string') { component_ids = [component_ids]; }
    return this.madame.authGet('permissions?component_ids=' + encodeURIComponent(component_ids.join(','))).share();
  } */

  setPermissions(resp: any) {
    let permKeys = Object.keys(resp);
    let permLen = permKeys.length;

    for (let _p = 0; _p < permLen; _p++) {
      this.p.components[permKeys[_p]] = resp[permKeys[_p]];
    }
  }


  canCreate(component_id: number, perms?: UserPermissions): boolean {
    return this.hasPermission(component_id, 2, perms);
  }

  canRead(component_id: number, perms?: UserPermissions): boolean {
    return this.hasPermission(component_id, 3, perms);
  }

  canUpdate(component_id: number, perms?: UserPermissions): boolean {
    return this.hasPermission(component_id, 4, perms);
  }

  canDelete(component_id: number, perms?: UserPermissions): boolean {
    return this.hasPermission(component_id, 5, perms);
  }

  hasPermission(component_id: number, operation_id: number, perms?: UserPermissions): boolean {
    if (perms === void 0) { perms = this.p; }

    try {
      if (perms.components[component_id].operations.indexOf(0) !== -1) { return false; }
      if (perms.components[component_id].operations.indexOf(1) !== -1) { return true; }
      if (perms.components[component_id].operations.indexOf(operation_id) !== -1) { return true; }
    } catch (e) { }

  return false;
  }

}
