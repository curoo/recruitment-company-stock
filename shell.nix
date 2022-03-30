{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell rec {
  name = "dev";

  buildInputs = [
    pkgs.python3
    pkgs.nodejs
  ];

  VENV_PATH = builtins.toString ./.venv;

  shellHook = ''
    [ -d "${VENV_PATH}" ] || python -m venv ${VENV_PATH}
    source ${VENV_PATH}/bin/activate
    pip install -r requirements.txt
  '';

  postShellHook = ''
    source ${VENV_PATH}/bin/activate
  '';
}
