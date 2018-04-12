import { Injectable } from "@angular/core";

/**
 * application flags and settings
 */
@Injectable()
export class ApplicationSettings {
    private debug: boolean = false;
    toggleDebug() {
        this.debug = !this.debug;
    }
    get showDebug() {
        return this.debug;
    }
}