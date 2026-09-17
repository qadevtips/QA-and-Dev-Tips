import math
import sys


class DivisionToolError(Exception):
    """Raised when the division tool cannot produce a result."""


def parse_number(raw_value, field_name):
    """Converts a raw string into a finite float or raises DivisionToolError."""
    if not raw_value.strip():
        raise DivisionToolError(f"{field_name} cannot be empty.")

    try:
        number = float(raw_value)
    except ValueError as format_error:
        raise DivisionToolError(
            f"{field_name} must be a number, got {raw_value!r}."
        ) from format_error

    if not math.isfinite(number):
        raise DivisionToolError(f"{field_name} must be a finite number, got {number}.")

    return number


def divide(first_input, second_input):
    """
    Divides two raw string inputs.

    Every failure mode is surfaced as a DivisionToolError with the original
    exception kept as __cause__, so callers can react instead of guessing.
    """
    numerator = parse_number(first_input, "The first number")
    denominator = parse_number(second_input, "The second number")

    try:
        return numerator / denominator
    except ZeroDivisionError as zero_error:
        raise DivisionToolError("Cannot divide by zero.") from zero_error


def run_advanced_division_tool():
    """
    Prompts for two numbers and prints the result.

    Returns the quotient on success. Expected failures are reported to the
    user and re-raised so the caller (and the process exit code) sees them;
    unexpected failures are never swallowed.
    """
    try:
        first_input = input("Enter the first number: ")
        second_input = input("Enter the second number: ")
    except EOFError as eof_error:
        raise DivisionToolError("No input available on stdin.") from eof_error

    try:
        result = divide(first_input, second_input)
    except DivisionToolError as tool_error:
        print(f"Input Error: {tool_error}", file=sys.stderr)
        raise
    else:
        print("Success! The numbers were processed cleanly.")
        print(f"The final calculated result is: {result}")
        return result
    finally:
        print("Cleaning up resources and shutting down the division tool.")


if __name__ == "__main__":
    try:
        run_advanced_division_tool()
    except (DivisionToolError, KeyboardInterrupt) as error:
        # Fail loudly with a non-zero exit code so scripts and CI notice.
        sys.exit(f"Division tool failed: {error or type(error).__name__}")
