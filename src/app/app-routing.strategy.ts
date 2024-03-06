import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
import { ComponentRef } from '@angular/core';

export class CustomReuseStrategy implements RouteReuseStrategy {

    private handles: Map<string, DetachedRouteHandle> = new Map();

    allowRetriveCache = {
        'design-model': true,
        'simulate-circuit': true
    };

    // Asks if a snapshot from the current routing can be used for the future routing.
    public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }

    // Asks if a snapshot for the current route already has been stored.
    // Return true, if handles map contains the right snapshot and the router should re-attach this snapshot to the routing.
    public shouldAttach(route: ActivatedRouteSnapshot): boolean {
        const path = this.getKey(route)
        return path && this.allowRetriveCache[path] && !!this.handles.get(path)
        if (this.shouldResetReuseStrategy(route)) {
            this.deactivateAllHandles();
            return false;
        }

        if (this.shouldIgnoreReuseStrategy(route)) {
            return false;
        }

        return this.handles.has(this.getKey(route));
    }

    // Load the snapshot from storage. It's only called, if the shouldAttach-method returned true.
    public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        return this.handles.get(this.getKey(route));
    }

    // Asks if the snapshot should be detached from the router.
    // That means that the router will no longer handle this snapshot after it has been stored by calling the store-method.
    public shouldDetach(route: ActivatedRouteSnapshot): boolean {
        const path = this.getKey(route)
        return path && this.allowRetriveCache[path]
        //    return !this.shouldIgnoreReuseStrategy(route);
    }

    // After the router has asked by using the shouldDetach-method and it returned true, the store-method is called (not immediately but some time later).
    public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
        if (!handle) {
            return;
        }
        this.handles.set(this.getKey(route), handle);
    }

    private shouldResetReuseStrategy(route: ActivatedRouteSnapshot): boolean {
        let snapshot: ActivatedRouteSnapshot = route;

        while (snapshot.children && snapshot.children.length) {
            snapshot = snapshot.children[0];
        }

        return snapshot.data && snapshot.data['resetReuseStrategy'];
    }

    private shouldIgnoreReuseStrategy(route: ActivatedRouteSnapshot): boolean {
        return route.data && route.data['defaultReuseStrategy'];
    }

    private deactivateAllHandles(): void {
        this.handles.forEach((handle: DetachedRouteHandle) => this.destroyComponent(handle));
        this.handles.clear();
    }

    private destroyComponent(handle: DetachedRouteHandle): void {
        const componentRef: ComponentRef<any> = handle['componentRef'];

        if (componentRef) {
            componentRef.destroy();
        }
    }

    private getKey(route: ActivatedRouteSnapshot): string {
        return route.pathFromRoot
            .map((snapshot: ActivatedRouteSnapshot) => snapshot.routeConfig ? snapshot.routeConfig.path : '')
            .filter((path: string) => path.length > 0)
            .join('');
    }
}