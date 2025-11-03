import re

# Test the patterns
patterns = {
    "java": r"^mflix/server/java-spring/(?P<file>.+)$",
    "express": r"mflix/server/express/(?P<file>.+)$",
    "python": r"mflix/server/python/(?P<file>.+)$"
}

test_files = [
    "mflix/server/java-spring/src/main/java/Test.java",
    "mflix/server/java-spring/pom.xml",
    "mflix/server/express/src/app.ts",
    "mflix/server/express/package.json",
    "mflix/server/python/main.py",
    "mflix/server/python/src/routers/movies.py"
]

for name, pattern in patterns.items():
    print(f"\n{name} pattern: {pattern}")
    regex = re.compile(pattern)
    for file in test_files:
        match = regex.match(file)
        if match:
            print(f"  ✓ {file} -> file={match.group('file')}")
        else:
            print(f"  ✗ {file}")
