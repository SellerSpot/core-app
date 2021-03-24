export type TPrimitiveType = string | number;

const inferRouteTypes = <T extends { [key: string]: string }>(arg: T): T => arg; // Infering types from Route object with autocomplete support.
