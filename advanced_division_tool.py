def run_advanced_division_tool():
    """
    Executes a mathematical division operation with comprehensive error handling.
    Demonstrates the utilization of try, except, else, finally, and raise blocks.
    """
    try:
        # Prompting the user for input values
        first_input = input("Enter the first number: ")
        second_input = input("Enter the second number: ")
        
        # Validating inputs before performing operations
        if not first_input or not second_input:
            raise ValueError("Inputs cannot be completely empty!")
            
        # Converting raw string inputs to floats
        num1 = float(first_input)
        num2 = float(second_input)
        
        # Performing the risky math operation
        final_score = num1 / num2
        
    except ValueError as format_error:
        # Catches bad text conversions or our custom raised empty input error
        print(f"Input Error: {format_error}")
        print("Please ensure you type numbers and do not leave fields blank.")
        
    except ZeroDivisionError as zero_error:
        # Catches division by zero specifically and captures system text
        print(f"Math Error: Cannot divide by zero. System message: {zero_error}")
        
    except Exception as unexpected_error:
        # A safe fallback catch for any other completely unknown runtime errors
        print(f"An unexpected issue occurred: {unexpected_error}")
        
    else:
        # This code runs ONLY if the try block succeeds with zero issues
        print("Success! The numbers were processed cleanly.")
        print(f"The final calculated result is: {final_score}")
        
    finally:
        # This block is guaranteed to execute no matter what happened above
        print("Cleaning up resources and shutting down the division tool.")

if __name__ == "__main__":
    # Executing the complete demo function when run directly
    run_advanced_division_tool()
