'''
@author: Richard Douglas
Created on Aug 19, 2018
'''
from data import get_data_manager


class Commands:
    QUIT = "-1"
    LEVELS = "0"
    PRINT_COMMANDS = "1"
    

def print_commands():
    print("Commands")
    print("{0} - Quit the game".format(Commands.QUIT))
    print("{0} - Display Levels".format(Commands.LEVELS))
    print("{0} - Print commands".format(Commands.PRINT_COMMANDS))
    return

def print_levels():
    data_manager = get_data_manager()
    print("Levels")
    print(tuple(lv.name() for lv in data_manager.getLevels()))
    return

def prompt_for_input():
    return raw_input("Enter a command: ")

print("Welcome to the Tower to the Heavens text application.")
print
print_commands()
print
user_input = prompt_for_input()
while user_input != Commands.QUIT:
    if user_input == Commands.LEVELS:
        print_levels()
    elif user_input == Commands.PRINT_COMMANDS:
        print_commands()
    else:
        print("Invalid command {0}".format(user_input))
    print
    user_input = prompt_for_input()
print
print("Thank you for playing")