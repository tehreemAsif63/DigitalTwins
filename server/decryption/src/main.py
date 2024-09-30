import subprocess
import platform
import time
import argparse

if __name__ == "__main__":
    # Create an argument parser
    parser = argparse.ArgumentParser()
    # Add command line arguments for the time to wait between script runs
    parser.add_argument('-t', '--time', type=int, default=10, help='Time to wait between script runs in seconds')
    # Parse the command line arguments
    args = parser.parse_args()

    # Loop indefinitely until the script is interrupted
    while True:
        # Determine the appropriate Python command based on the operating system
        python_command = "python3" if platform.system() in ["Linux", "Darwin"] else "python"

        # Run the decryption script
        subprocess.run([python_command, "decryptor.py"])

        # Wait for 5 seconds
        print(f'Sleeping for {args.time} seconds...')
        time.sleep(args.time)