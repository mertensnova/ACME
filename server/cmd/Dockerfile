# Use alpine as the base image
FROM alpine:latest

# Install golang
RUN apk add --no-cache go

# Set the working directory
WORKDIR /app

# Copy the source code
COPY . .

# Build the binary
RUN go build -o server .

# Expose port 8080
EXPOSE 8080

# Run the binary
CMD ["./server"]
