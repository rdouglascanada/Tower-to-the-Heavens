'''
@author: Richard Douglas
Created on Aug 18, 2018
'''
from move import MoveNames
from battler import Battler

class Unit:
    def __init__(self, args):
        self.name = lambda: args['name']
        self.max_hitpoints = lambda: args['max_hitpoints']
        self.power = lambda: args['power']
        self.moves = lambda: tuple(args['moves'])
        return
    
    def generate_battler(self):
        return Battler({'unit': self, 'hitpoints': self.max_hitpoints()})

class UnitNames:
    FIRE_MAGE = "Fire Mage"
    BATUMAN = "Batuman"

class UnitData:
    data = [
            {
                'name': UnitNames.FIRE_MAGE,
                'max_hitpoints': 10,
                'power': 10,
                'move_names': [MoveNames.HOMING_FIRE],
            },
            {
                'name': UnitNames.BATUMAN,
                'max_hitpoints': 30,
                'power': 20,
                'move_names': [MoveNames.BLINDING_DARKNESS],
            },
        ]