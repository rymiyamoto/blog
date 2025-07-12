#!/bin/zsh
export TS_NODE_PROJECT=docs/tsconfig.json
tsx --tsconfig docs/tsconfig.json --require tsconfig-paths/register "$@"
