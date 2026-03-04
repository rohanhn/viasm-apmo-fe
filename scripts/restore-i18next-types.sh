#!/bin/bash

# Script to restore i18next TypeScript declaration files after build

echo "Restoring i18next TypeScript declarations..."

# Restore i18next type files
if [ -f "./node_modules/i18next/typescript/t.d.ts.backup" ]; then
    mv "./node_modules/i18next/typescript/t.d.ts.backup" "./node_modules/i18next/typescript/t.d.ts"
    echo "âœ“ Restored i18next/typescript/t.d.ts"
fi

if [ -f "./node_modules/react-i18next/index.d.ts.backup" ]; then
    mv "./node_modules/react-i18next/index.d.ts.backup" "./node_modules/react-i18next/index.d.ts"
    echo "âœ“ Restored react-i18next/index.d.ts"
fi

echo "i18next TypeScript declarations restored"
