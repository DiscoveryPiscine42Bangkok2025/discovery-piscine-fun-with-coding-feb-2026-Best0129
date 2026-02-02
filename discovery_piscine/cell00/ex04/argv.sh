#!/bin/bash

count=1

for arg in "$@"
do
  if [ $count -gt 3 ]; then
    break
  fi

  echo "$arg"
  count=$((count + 1))
done
