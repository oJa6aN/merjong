export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal'

export const LEVELS: Record<LogLevel, number> = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5,
}

export const log: Record<keyof typeof LEVELS, typeof console.log> = {
  trace: (..._args: any[]) => { },
  debug: (..._args: any[]) => { },
  info: (..._args: any[]) => { },
  warn: (..._args: any[]) => { },
  error: (..._args: any[]) => { },
  fatal: (..._args: any[]) => { },
}