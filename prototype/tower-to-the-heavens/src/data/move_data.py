'''
@author: Richard Douglas
Created on Aug 19, 2018
'''
from status_data import StatusNames

class MoveNames:
    ATTACK = "Attack"
    HOMING_FIRE = "Homing Fire"
    BLINDING_DARKNESS = "Blinding Darkness"

class MoveData:
    data = [
            {
                'name': MoveNames.ATTACK,
                'index':1,
                'cost': 0,
                'damage': 10,
                'status_name': StatusNames.NONE,
            },
            {
                'name': MoveNames.HOMING_FIRE,
                'index':2,
                'cost': 10,
                'damage': 20,
                'status_name': StatusNames.NONE,
            },
            {
                'name': MoveNames.BLINDING_DARKNESS,
                'index':3,
                'cost': 20,
                'damage': 10,
                'status_name': StatusNames.BLIND,
            },
        ]