const RESET = "\x1b[0m";
const BLUE = "\x1b[34m";
const BRIGHT = "\x1b[1m";

export const formatServiceLog = (serviceName, uri) =>
  `🚀 ${serviceName} service ready at ${BLUE}${BRIGHT}${uri}${RESET}`;
