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
var mono_logging_1 = require('@strictd/mono-logging/mono-logging');
var madame_service_1 = require('@strictd/madame/madame-service');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/share');
var RolePermissions = (function () {
    function RolePermissions(_mono, _madame) {
        this.p = { components: {} };
        this.mono = _mono;
        this.madame = _madame;
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
    RolePermissions.prototype.fetchComponentPermission = function (component_ids) {
        if (typeof component_ids === 'string') {
            component_ids = [component_ids];
        }
        return this.madame.authGet('permissions?component_ids=' + encodeURIComponent(component_ids.join(','))).share();
    };
    RolePermissions.prototype.setPermissions = function (resp) {
        var permKeys = Object.keys(resp);
        var permLen = permKeys.length;
        for (var _p = 0; _p < permLen; _p++) {
            this.p.components[permKeys[_p]] = resp[permKeys[_p]];
        }
    };
    RolePermissions.prototype.canCreate = function (component_id) {
        return this.hasPermission(component_id, 2);
    };
    RolePermissions.prototype.canRead = function (component_id) {
        return this.hasPermission(component_id, 3);
    };
    RolePermissions.prototype.canUpdate = function (component_id) {
        return this.hasPermission(component_id, 4);
    };
    RolePermissions.prototype.canDelete = function (component_id) {
        return this.hasPermission(component_id, 5);
    };
    RolePermissions.prototype.hasPermission = function (component_id, operation_id) {
        try {
            if (this.p.components[component_id].operations.indexOf(0) !== -1) {
                return false;
            }
            if (this.p.components[component_id].operations.indexOf(1) !== -1) {
                return true;
            }
            if (this.p.components[component_id].operations.indexOf(operation_id) !== -1) {
                return true;
            }
        }
        catch (e) {
            return false;
        }
        return false;
    };
    RolePermissions._permissionObserable = new Observable_1.Observable(function (observer) {
        RolePermissions._permissionObserver = observer;
    }).share();
    RolePermissions = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [mono_logging_1.MonoLogging, madame_service_1.MadameService])
    ], RolePermissions);
    return RolePermissions;
}());
exports.RolePermissions = RolePermissions;
//# sourceMappingURL=role-permissions.js.map