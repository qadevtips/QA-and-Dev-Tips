import builtins

import pytest

from advanced_division_tool import run_advanced_division_tool

CLEANUP_MESSAGE = "Cleaning up resources and shutting down the division tool."


@pytest.fixture
def run_with_inputs(monkeypatch, capsys):
    def _run(*inputs):
        values = iter(inputs)
        monkeypatch.setattr(builtins, "input", lambda _prompt="": next(values))
        run_advanced_division_tool()
        return capsys.readouterr().out

    return _run


def test_successful_division(run_with_inputs):
    out = run_with_inputs("10", "4")
    assert "Success!" in out
    assert "The final calculated result is: 2.5" in out
    assert CLEANUP_MESSAGE in out


def test_negative_and_decimal_inputs(run_with_inputs):
    out = run_with_inputs("-7.5", "2.5")
    assert "The final calculated result is: -3.0" in out


@pytest.mark.parametrize("inputs", [("", "2"), ("5", "")])
def test_empty_input_raises_value_error(run_with_inputs, inputs):
    out = run_with_inputs(*inputs)
    assert "Input Error: Inputs cannot be completely empty!" in out
    assert "Success!" not in out
    assert CLEANUP_MESSAGE in out


def test_non_numeric_input_reports_input_error(run_with_inputs):
    out = run_with_inputs("abc", "2")
    assert "Input Error:" in out
    assert "Please ensure you type numbers" in out
    assert "Success!" not in out


def test_division_by_zero_reports_math_error(run_with_inputs):
    out = run_with_inputs("8", "0")
    assert "Math Error: Cannot divide by zero." in out
    assert "Success!" not in out
    assert CLEANUP_MESSAGE in out


def test_unexpected_error_is_caught(monkeypatch, capsys):
    def boom(_prompt=""):
        raise RuntimeError("stdin exploded")

    monkeypatch.setattr(builtins, "input", boom)
    run_advanced_division_tool()
    out = capsys.readouterr().out
    assert "An unexpected issue occurred: stdin exploded" in out
    assert CLEANUP_MESSAGE in out
