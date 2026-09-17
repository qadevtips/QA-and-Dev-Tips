"""A simple mechanism to check system health and route traffic safely."""

import sys


class TotalOutageError(RuntimeError):
    """Raised when neither the primary nor the backup region can serve traffic."""


def route_traffic_with_failover(primary_healthy, backup_healthy):
    # Check if the main production infrastructure is online
    if primary_healthy:
        print("SYSTEM STATUS: Primary data center is fully operational.")
        print("ACTION: Routing all user traffic to the main pipeline.")
        return "PRIMARY_ACTIVE"

    # Trigger fallback logic if the main system experiences a failure
    print("WARNING: Primary data center infrastructure is completely unresponsive!", file=sys.stderr)

    if backup_healthy:
        print("ALERT: Initiating automatic multi-region failover procedures...")
        print("ACTION: Successfully rerouted all traffic to the backup region.")
        return "BACKUP_ACTIVE"

    # A total outage is not a routing decision, so it is raised rather than
    # returned as a sentinel string a caller could ignore.
    raise TotalOutageError("All regional cloud environments are currently down!")


def main():
    # Simulate a severe thermal event or network blackout on the primary cluster
    primary_region_status = False
    backup_region_status = True

    print("Starting infrastructure orchestration monitor...")
    try:
        current_route = route_traffic_with_failover(primary_region_status, backup_region_status)
    except TotalOutageError as outage:
        print(f"CRITICAL ERROR: {outage}", file=sys.stderr)
        return 1

    print(f"Monitoring complete. Current routing pathway set to: {current_route}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
