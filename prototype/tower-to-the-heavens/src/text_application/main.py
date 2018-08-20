'''
@author: Richard Douglas
Created on Aug 19, 2018
'''
class Commands:
    QUIT = "-1"
    PRINT_COMMANDS = "-2"

def print_commands():
    print("Commands")
    print("{0} - Quit the game".format(Commands.QUIT))
    print("{0} - Print commands".format(Commands.PRINT_COMMANDS))
    return

def prompt_for_input():
    return raw_input("Enter a command: ")

print("Welcome to the Tower to the Heavens text application.")
print
print_commands()
print
user_input = prompt_for_input()
while user_input != Commands.QUIT:
    if user_input == Commands.PRINT_COMMANDS:
        print_commands()
    else:
        print("Invalid command {0}".format(user_input))
    print
    user_input = prompt_for_input()
print
print("Thank you for playing")