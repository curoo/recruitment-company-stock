{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell rec {
  name = "dev";

  buildInputs = [
    pkgs.nodejs
    pkgs.python39
    pkgs.python39Packages.wheel
    pkgs.openssl
    pkgs.postgresql
  ];

  VIRTUAL_ENV = builtins.toString ./venv;

  shellHook = ''
    [ -d "${VIRTUAL_ENV}" ] || {
      python -m venv ${VIRTUAL_ENV}
      source ${VIRTUAL_ENV}/bin/activate
      pip install -r requirements.txt
    }
  '';

  postShellHook = ''
    source ${VIRTUAL_ENV}/bin/activate
  '';
}
