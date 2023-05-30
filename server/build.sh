#!/bin/sh
# Set the output file name
OUTPUT=server

# Set the main package file name
MAIN=main.go

cd cmd
# Build the binary executable
go build -o $OUTPUT $MAIN

# Print a success message
echo "Built $OUTPUT successfully"
