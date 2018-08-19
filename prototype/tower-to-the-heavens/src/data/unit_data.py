'''
@author: Richard Douglas
Created on Aug 19, 2018
'''
from move_data import MoveNames


class UnitNames:
    LUCY = "Lucy"
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
            {
                'name': UnitNames.LUCY,
                'max_hitpoints': 100,
                'power': 0,
                'move_names': [MoveNames.ATTACK],
            },
        ]