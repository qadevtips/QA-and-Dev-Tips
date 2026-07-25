import pytest

from aws_failover_demo import route_traffic_with_failover


@pytest.mark.parametrize(
    "primary_healthy, backup_healthy, expected",
    [
        (True, True, "PRIMARY_ACTIVE"),
        (True, False, "PRIMARY_ACTIVE"),
        (False, True, "BACKUP_ACTIVE"),
        (False, False, "TOTAL_OUTAGE"),
    ],
)
def test_routing_decision(primary_healthy, backup_healthy, expected):
    assert route_traffic_with_failover(primary_healthy, backup_healthy) == expected


def test_primary_healthy_does_not_warn(capsys):
    route_traffic_with_failover(True, False)
    out = capsys.readouterr().out
    assert "Primary data center is fully operational." in out
    assert "WARNING" not in out


def test_failover_reports_warning_and_reroute(capsys):
    route_traffic_with_failover(False, True)
    out = capsys.readouterr().out
    assert "WARNING" in out
    assert "backup region" in out


def test_total_outage_reports_critical_error(capsys):
    route_traffic_with_failover(False, False)
    out = capsys.readouterr().out
    assert "CRITICAL ERROR" in out
