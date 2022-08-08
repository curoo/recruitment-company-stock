{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell rec {
  name = "dev";

  buildInputs = [
    pkgs.nodejs
    pkgs.openssl
    pkgs.postgresql
  ];

  # https://stackoverflow.com/a/70238851/644945
  DOCKER_DEFAULT_PLATFORM = "linux/amd64";
}
