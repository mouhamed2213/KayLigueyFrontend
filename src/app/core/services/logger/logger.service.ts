import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export interface LogContext {
  userId?: string;
  route?: string;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private isEnabled: boolean = environment.enableLogging;
  private logLevel: LogLevel = environment.logLevel;
  private correlationId: string = crypto.randomUUID();

  constructor() {}

  debug(message: string, context?: LogContext): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  info(message: string, context?: LogContext): void {
    this.log(LogLevel.INFO, message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log(LogLevel.WARN, message, context);
  }

  error(message: string, context?: LogContext): void {
    this.log(LogLevel.ERROR, message, context);
  }

  private log(level: LogLevel, message: string, context?: LogContext): void {
    if (!this.isEnabled || level < this.logLevel) return;

    const logEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel[level],
      message,
      correlationId: this.correlationId,
      ...context,
    };

    // En dev → console
    if (!environment.production) {
      this.printToConsole(level, logEntry);
    }

    // En prod → serveur / outil externe
    if (environment.production) {
      this.sendToServer(logEntry);
    }
  }

  private printToConsole(level: LogLevel, log: any): void {
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(log);
        break;
      case LogLevel.INFO:
        console.info(log);
        break;
      case LogLevel.WARN:
        console.warn(log);
        break;
      case LogLevel.ERROR:
        console.error(log);
        break;
    }
  }

  private sendToServer(log: any): void {
    //  À remplacer par HttpClient ou SDK (Sentry, etc.)
    // Exemple simple :
    // this.http.post('/api/logs', log).subscribe();

    // Pour l’instant :
    console.log('Sending log to server:', log);
  }

  // Optionnel : permet de changer le correlationId (ex: nouveau flow)
  setCorrelationId(id: string): void {
    this.correlationId = id;
  }
}
