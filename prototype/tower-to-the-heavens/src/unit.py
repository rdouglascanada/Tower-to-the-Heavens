'''
@author: Richard Douglas
Created on Aug 18, 2018
'''
from move import MoveNames

class Unit:
    def __init__(self, args):
        self.name = lambda: args['name']
        self.moves = lambda: tuple(args['moves'])
        return

class UnitNames:
    FIRE_MAGE = "Fire Mage"
    BATUMAN = "Batuman"

class UnitData:
    data = [
            {
                'name': UnitNames.FIRE_MAGE,
                'move_names': [MoveNames.HOMING_FIRE],
            },
            {
                'name': UnitNames.BATUMAN,
                'move_names': [MoveNames.BLINDING_DARKNESS],
            },
        ]