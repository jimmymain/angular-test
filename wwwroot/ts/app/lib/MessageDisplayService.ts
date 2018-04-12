import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import * as Noty from "noty";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "noty/lib/noty.css";
import "noty/lib/themes/metroui.css";
/**
 * search text emitter.
 */
export class ErrorMessageEmitter extends Subject<string>{
    message: string;
    constructor() {
        super();
    }
    emit(value) {
        this.message = value.toLowerCase();
        super.next(value);
    }
}

/**
 * search service.
 */
@Injectable()
export class MessageDisplayService {
    error = new ErrorMessageEmitter();

    constructor() {
    }

    observeError<T>(observable: T): Observable<T> {
        this.emitErrorMessage(<any>observable);
        return Observable.throw(observable);
    }

    /**
     * show the error message.
     * @param message an http response, or text message.
     */
    emitErrorMessage(message: string): void;
    emitErrorMessage(message: HttpErrorResponse): void;
    emitErrorMessage(message: string | HttpErrorResponse): void {
        if (message instanceof HttpErrorResponse)
            this.error.emit(this.decodeHttpError(message));
        else
            this.error.emit(message);
    }

    showErrorMessage(message: string): void {
        const noty = new Noty({
            text: message,
            type: "error",
            timeout: 5000,
            theme: "metroui"
        });
        noty.show();
    }
   
    showSuccessMessage(message: string): void {
        const noty = new Noty({
            text: message,
            type: "success",
            timeout: 5000,
            theme: "metroui"
        });
        noty.show();
    }

    showWarning(message: string): void {
        const noty = new Noty({
            text: message,
            type: "warning",
            timeout: 5000,
            theme: "metroui"
        });
        noty.show();
    }

    showMessage(message: string): void {
        const noty = new Noty({
            text: message,
            type: "information",
            timeout: 5000,
            theme: "metroui"
        });
        noty.show();
    }

    getLastErrorMessage() {
        return this.error.message;
    }

    /**
     * decode the http error from the supplied response.
     * @param http the response.
     */
    decodeHttpError(http: HttpErrorResponse) {
        return (http.error && http.error.message) || http.message;
    }
}