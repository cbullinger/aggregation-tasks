import argparse, pkgutil, importlib
import tasks


def main():
    parser = argparse.ArgumentParser(
        description="Run study tasks against the Yelp dataset"
    )
    subparsers = parser.add_subparsers(dest="task", required=True)
    task_names = [name for _, name, _ in pkgutil.iter_modules(tasks.__path__)]
    for name in task_names:
        subparsers.add_parser(name)
    args = parser.parse_args()

    task_mod = importlib.import_module(f"tasks.{args.task}")
    task_mod.run()

if __name__ == "__main__":
    main()
# Test change: verify copier syncs Python agg files (workflow 4)
# Timestamp: 2026-02-15
