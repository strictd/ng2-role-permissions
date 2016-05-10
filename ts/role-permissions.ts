import { Injectable } from '@angular/core';
import { MonoLogging } from '@strictd/mono-logging/mono-logging';
import { MadameService } from '@strictd/madame/madame-service';

// import { App } from '../../app';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';

export interface UserPermissions {
  components: ComponentPermissionList;
}

export interface ComponentPermissionList {
  [index: number]: ComponentPermissions;
}

export interface ComponentPermissions {
  operations: OperationPermissions;
  role_id: number;
  component_tag?: string;
  role_tag?: string;
}

export interface OperationPermissions {
  [index: string]: number[]; // index is gadget_id
}

@Injectable()
export class RolePermissions {

  static _permissionObserver: Observer<any>;
  static _permissionObserable = new Observable((observer: Observer<any>) => {
   RolePermissions._permissionObserver = observer; // Assign to static RolePermissions._permissionObserver
  }).share();

  mono: MonoLogging;
  madame: MadameService;
  p: UserPermissions = {components: {}};

  constructor(_mono: MonoLogging, _madame: MadameService) {
    this.mono = _mono;
    this.madame = _madame;

    RolePermissions._permissionObserable.subscribe((data) => { return; });
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

  fetchComponentPermission(component_ids: any): Observable<any> {
    if (typeof component_ids === 'string') { component_ids = [component_ids]; }
    let _t = this;
    let compGet = this.madame.authGet('permissions/components?component_ids=' + encodeURIComponent(component_ids.join(',')));
    compGet.subscribe(
      response => {
        let resp = response.json();
        if (resp.permissions !== undefined) {
          let permLen = resp.permissions.length;
          for (let _p = 0; _p < permLen; _p++) {
            _t.p.components[_p] = resp.permissions[_p];
          }

          this.savePermissions();
          RolePermissions._permissionObserver.next(_t.p);
        }
      },
      error => { this.mono.log('Error: ' + error.text()); }
    );

    return compGet;
  }


  canCreate(component_id: number): boolean {
    return this.hasPermission(component_id, 2);
  }

  canRead(component_id: number): boolean {
    return this.hasPermission(component_id, 3);
  }

  canUpdate(component_id: number): boolean {
    return this.hasPermission(component_id, 4);
  }

  canDelete(component_id: number): boolean {
    return this.hasPermission(component_id, 5);
  }

  hasPermission(component_id: number, operation_id: number): boolean {
    try {
      if (this.p.components[component_id].operations[0] !== undefined) { return false; }
      if (this.p.components[component_id].operations[1] !== undefined) { return true; }
      if (this.p.components[component_id].operations[operation_id] !== undefined) { return true; }
    } catch (e) { return false; }
  return false;
  }

}