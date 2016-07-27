import { MonoLogging } from '@strictd/mono-logging/mono-logging';
import { MadameService } from '@strictd/madame/madame-service';
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
    [index: string]: number;
}
export declare class RolePermissions {
    static _permissionObserver: Observer<any>;
    static _permissionObserable: Observable<{}>;
    mono: MonoLogging;
    madame: MadameService;
    p: UserPermissions;
    constructor(_mono: MonoLogging, _madame: MadameService);
    currentPermissions(): any;
    savePermissions(): void;
    resetPermissions(): void;
    fetchComponentPermission(component_ids: any): Observable<any>;
    canCreate(component_id: number): boolean;
    canRead(component_id: number): boolean;
    canUpdate(component_id: number): boolean;
    canDelete(component_id: number): boolean;
    hasPermission(component_id: number, operation_id: number): boolean;
}
