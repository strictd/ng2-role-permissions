"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/share');
var RolePermissions = (function () {
    function RolePermissions() {
        this.p = { components: {} };
        RolePermissions._permissionObserable.subscribe(function (data) { return; });
        this.p = this.currentPermissions();
    }
    RolePermissions.prototype.currentPermissions = function () {
        var sP = localStorage.getItem('strictPermission');
        if (sP !== undefined && sP !== null && sP !== 'null') {
            return JSON.parse(sP);
        }
        return { components: {} };
    };
    RolePermissions.prototype.savePermissions = function () {
        localStorage.setItem('strictPermission', JSON.stringify(this.p));
    };
    RolePermissions.prototype.resetPermissions = function () {
        localStorage.removeItem('strictPermission');
        this.p = this.currentPermissions();
    };
    RolePermissions.prototype.setPermissions = function (resp) {
        var permKeys = Object.keys(resp);
        var permLen = permKeys.length;
        for (var _p = 0; _p < permLen; _p++) {
            this.p.components[permKeys[_p]] = resp[permKeys[_p]];
        }
    };
    RolePermissions.prototype.canCreate = function (component_id, perms) {
        return this.hasPermission(component_id, 2, perms);
    };
    RolePermissions.prototype.canRead = function (component_id, perms) {
        return this.hasPermission(component_id, 3, perms);
    };
    RolePermissions.prototype.canUpdate = function (component_id, perms) {
        return this.hasPermission(component_id, 4, perms);
    };
    RolePermissions.prototype.canDelete = function (component_id, perms) {
        return this.hasPermission(component_id, 5, perms);
    };
    RolePermissions.prototype.hasPermission = function (component_id, operation_id, perms) {
        if (perms === void 0) {
            perms = this.p;
        }
        try {
            if (perms.components[component_id].operations.indexOf(0) !== -1) {
                return false;
            }
            if (perms.components[component_id].operations.indexOf(1) !== -1) {
                return true;
            }
            if (perms.components[component_id].operations.indexOf(operation_id) !== -1) {
                return true;
            }
        }
        catch (e) { }
        return false;
    };
    RolePermissions._permissionObserable = new Observable_1.Observable(function (observer) {
        RolePermissions._permissionObserver = observer;
    }).share();
    RolePermissions = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], RolePermissions);
    return RolePermissions;
}());
exports.RolePermissions = RolePermissions;
//# sourceMappingURL=role-permissions.js.map