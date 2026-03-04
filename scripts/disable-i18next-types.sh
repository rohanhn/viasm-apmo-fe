#!/bin/bash

# Script to disable problematic i18next TypeScript declaration files during build

echo "Disabling i18next TypeScript declarations..."

# Backup and disable i18next type files
if [ -f "./node_modules/i18next/typescript/t.d.ts" ]; then
    mv "./node_modules/i18next/typescript/t.d.ts" "./node_modules/i18next/typescript/t.d.ts.backup"
    echo "âœ“ Disabled i18next/typescript/t.d.ts"
fi

if [ -f "./node_modules/react-i18next/index.d.ts" ]; then
    mv "./node_modules/react-i18next/index.d.ts" "./node_modules/react-i18next/index.d.ts.backup"
    echo "âœ“ Disabled react-i18next/index.d.ts"
fi

echo "i18next TypeScript declarations disabled for build"
