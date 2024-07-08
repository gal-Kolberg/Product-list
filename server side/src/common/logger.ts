import pinoLogger from "pino"

export const logger = pinoLogger({
  formatters: {
    bindings: () => ({}),
    level: (label) => {
      return {level: label}
    }
  }
});