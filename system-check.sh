#!/bin/bash

function bin_check() {
  which $1 > /dev/null; exists=$?
  [ $exists -ne 0 ] && echo -e "\nERROR: $1 not found" && exit 1

  printf "%-20s" $1
  [ $exists -eq 0 ] && echo "OK" || echo "MISSING"
}

echo "Checking for required binaries..."
echo

bin_check "npm"
bin_check "docker"
bin_check "docker-compose"
bin_check "git"

echo
echo "System check complete."
