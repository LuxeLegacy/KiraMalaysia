#!/bin/bash

# This script adds useTranslation hooks to all calculator files that don't have them yet

CALCULATOR_DIRS=(
  "src/pages/automotive"
  "src/pages/property"
  "src/pages/islamic-finance"
  "src/pages/life"
  "src/pages/finance"
  "src/pages/income-tax"
)

for dir in "${CALCULATOR_DIRS[@]}"; do
  # Find all .tsx files in the directory
  find "/tmp/cc-agent/63772935/project/$dir" -name "*.tsx" -type f | while read -r file; do
    # Check if file already has useTranslation
    if grep -q "useTranslation" "$file"; then
      echo "Skipping $file (already has useTranslation)"
      continue
    fi

    echo "Processing: $file"

    # Add useTranslation import after react imports
    sed -i "/^import.*from 'react';$/a import { useTranslation } from 'react-i18next';" "$file"

    # Add const { t } declaration after component definition
    sed -i "/export const.*= () => {$/a \  const { t } = useTranslation(['calculators', 'common', 'forms', 'results']);" "$file"

    echo "Added translations to: $file"
  done
done

echo "Translation hooks added to all calculator files!"
