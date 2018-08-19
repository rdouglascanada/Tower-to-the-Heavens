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
                'cost': 0,
                'damage': 10,
                'status_name': StatusNames.NONE,
            },
            {
                'name': MoveNames.HOMING_FIRE,
                'cost': 10,
                'damage': 20,
                'status_name': StatusNames.NONE,
            },
            {
                'name': MoveNames.BLINDING_DARKNESS,
                'cost': 20,
                'damage': 10,
                'status_name': StatusNames.BLIND,
            },
        ]