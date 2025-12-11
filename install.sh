#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BINARY_NAME="row-kirat-row"
INSTALL_DIR="/usr/local/bin"
GITHUB_REPO="afairlie/mobile-island"
VERSION="latest"

echo -e "${GREEN}Installing Row Kirat Row...${NC}"

# Verify macOS
OS=$(uname -s)
if [ "$OS" != "Darwin" ]; then
    echo -e "${RED}Error: This installer only supports macOS${NC}"
    exit 1
fi

# Download URL from GitHub releases
DOWNLOAD_URL="https://github.com/${GITHUB_REPO}/releases/latest/download/${BINARY_NAME}"

echo -e "${YELLOW}Downloading ${BINARY_NAME}...${NC}"

# Download to temp location
TMP_FILE="/tmp/${BINARY_NAME}"
if command -v curl > /dev/null; then
    curl -fsSL "$DOWNLOAD_URL" -o "$TMP_FILE"
elif command -v wget > /dev/null; then
    wget -q "$DOWNLOAD_URL" -O "$TMP_FILE"
else
    echo -e "${RED}Error: Neither curl nor wget found. Please install one of them.${NC}"
    exit 1
fi

# Make it executable
chmod +x "$TMP_FILE"

# Install to system directory
echo -e "${YELLOW}Installing to ${INSTALL_DIR}...${NC}"

# Try to install to /usr/local/bin (may require sudo)
if [ -w "$INSTALL_DIR" ]; then
    mv "$TMP_FILE" "$INSTALL_DIR/$BINARY_NAME"
else
    echo -e "${YELLOW}Need sudo permissions to install to ${INSTALL_DIR}${NC}"
    sudo mv "$TMP_FILE" "$INSTALL_DIR/$BINARY_NAME"
fi

echo -e "${GREEN}✓ Installation complete!${NC}"
echo ""
echo -e "${GREEN}Run the game with:${NC} ${BINARY_NAME}"
echo ""