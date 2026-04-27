#!/bin/bash
PROBLEM_NAME=$1
DIR="problems/$PROBLEM_NAME"

mkdir -p "$DIR"

cat > "$DIR/solution.ts" << 'EOF'
export function solution() {
// TODO: implement
}
EOF

cat > "$DIR/solution.test.ts" << EOF
import { solution } from './solution';

describe('$PROBLEM_NAME', () => {
test('example 1', () => {
  // TODO: add test
});
});
EOF

cat > "$DIR/README.md" << EOF
# $PROBLEM_NAME

**Difficulty:**
**Source:**

## Problem

## Constraints

## Complexity Target
- Time:
- Space:
EOF
