import re

# The pattern from copier-config.yaml
pattern = r"mflix/server/python/(?P<file>.+)$"

# Actual files from the repo
files = [
    "mflix/server/python/.gitignore",
    "mflix/server/python/README.md",
    "mflix/server/python/main.py",
    "mflix/server/python/requirements.in",
    "mflix/server/python/requirements.txt",
    "mflix/server/python/src/database/mongo_client.py",
    "mflix/server/python/src/models/models.py",
    "mflix/server/python/src/routers/movies.py",
    "mflix/server/python/src/utils/errorHandler.py"
]

# Exclude patterns
exclude_patterns = [
    r"\.gitignore$"
]

regex = re.compile(pattern)
exclude_regexes = [re.compile(p) for p in exclude_patterns]

print("Testing Python server pattern:")
print(f"Pattern: {pattern}\n")

for file in files:
    match = regex.match(file)
    if match:
        captured_file = match.group('file')
        excluded = any(ex.search(file) for ex in exclude_regexes)
        status = "EXCLUDED" if excluded else "MATCH"
        print(f"{status}: {file}")
        print(f"  -> server/{captured_file}")
    else:
        print(f"NO MATCH: {file}")
