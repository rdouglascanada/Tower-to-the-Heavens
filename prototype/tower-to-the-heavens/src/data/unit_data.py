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
                'name': UnitNames.LUCY,
                'index':0,
                'max_hitpoints': 100,
                'power': 0,
                'move_names': [MoveNames.ATTACK],
            },
            {
                'name': UnitNames.FIRE_MAGE,
                'index':1,
                'max_hitpoints': 10,
                'power': 10,
                'move_names': [MoveNames.HOMING_FIRE],
            },
            {
                'name': UnitNames.BATUMAN,
                'index':2,
                'max_hitpoints': 30,
                'power': 20,
                'move_names': [MoveNames.BLINDING_DARKNESS],
            },
        ]