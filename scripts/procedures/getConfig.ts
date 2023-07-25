import { compat, types as T } from "../deps.ts";

export const getConfig: T.ExpectedExports.getConfig = compat.getConfig({
  "vaultwarden-tor-address": {
    name: "Tor Address",
    description: "The Tor address for the Vaultwarden web interface.",
    type: "pointer",
    target: "tor-address",
    interface: "main",
    subtype: "package",
    "package-id": "vaultwarden",
  },
  "vaultwarden-lan-address": {
    name: "LAN Address",
    description: "The LAN address for the Vaultwarden web interface.",
    type: "pointer",
    target: "lan-address",
    interface: "main",
    subtype: "package",
    "package-id": "vaultwarden",
  },
  "admin-token": {
    type: "string",
    name: "Admin Token",
    description: "Authentication token for logging into your admin dashboard.",
    nullable: false,
    pattern: "[a-zA-Z0-9/=\\-_]+",
    "pattern-description": "Must be a valid base 64 string",
    copyable: true,
    masked: true,
    default: {
      charset: "a-z,A-Z,0-9,/,=",
      len: 64,
    },
  },
});
