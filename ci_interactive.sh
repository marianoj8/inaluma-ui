#!/usr/bin/env bash

re=[^br]

echo "What would you like to do? (b -> build, r -> run, q -> quit): "
read -r choice

if [[ $choice =~ $re ]]; then
  if [ $choice = q ]; then
    echo see ya
  else
    echo "I understand! Technology is not easy..."
  fi
  exit 0
else
  set -e
  if [ $choice = b ]; then
    echo "stopping and flushing containers"
    docker-compose down -v

    echo 'removing api image'
    docker rmi -f 3p1l/inaluma-api-anew:arm64-v8-1.0-beta

    echo "pulling images and raising containers"
    docker-compose up -d --build --force-recreate
  else
    docker-compose up -d
  fi
fi
