# Variables
FRONTEND_DIR = frontend
BACKEND_DIR = server
BUILD_DIR = $(BACKEND_DIR)/public

# Default target
all: build

# Build target
build:
	@echo "Building React app..."
	@cd $(FRONTEND_DIR) && npm install && npm run build
	@echo "Build complete."

# Run target
run:
	@echo "Starting server..."
	@cd $(BACKEND_DIR) && npm install && npm start

# Clean target
clean:
	@echo "Cleaning build directory..."
	@rm -rf $(BUILD_DIR)
	@echo "Clean complete."