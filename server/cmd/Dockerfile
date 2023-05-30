# Use the official golang image as a base image
FROM golang:1.16

# Set the working directory inside the container
WORKDIR /app

# Copy the go.mod and go.sum files to the working directory
COPY ../go.mod .
COPY ../go.sum .

# Download all dependencies
RUN go mod download

# Copy the source code from the current directory to the working directory
COPY . .

# Build the application
RUN go build -o main ./cmd/main.go

# Expose port 8080 to the outside world
EXPOSE 8080

# Run the executable
CMD ["./main"]
