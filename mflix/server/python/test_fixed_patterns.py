import re

# Test the FIXED patterns with ^ anchor
patterns = {
    "express": r"^mflix/server/express/(?P<file>.+)$",
    "python": r"^mflix/server/python/(?P<file>.+)$",
}

test_files = [
    "mflix/server/express/src/index.ts",
    "mflix/server/express/package.json",
    "mflix/server/python/main.py",
    "mflix/server/python/src/routers/movies.py",
    "mflix/server/python/requirements.txt",
]

for lang, pattern in patterns.items():
    print(f"\n{lang.upper()} Pattern: {pattern}")
    print("=" * 60)
    regex = re.compile(pattern)
    
    for file in test_files:
        if lang in file:
            match = regex.match(file)
            if match:
                captured_file = match.group('file')
                print(f"  ✓ {file}")
                print(f"    → server/{captured_file}")
            else:
                print(f"  ✗ {file}")
