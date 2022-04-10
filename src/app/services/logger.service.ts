import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Logger {
    public logs: string[] = []; // capture logs for testing

    log(message: string) {
        this.logs.push(message);
        console.log(message);
    }
}