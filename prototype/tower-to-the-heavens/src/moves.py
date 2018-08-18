'''
moves.py

@author: Richard Douglas
Created on Aug 18, 2018
'''
from copy import deepcopy


class Move:
    def __init__(self, name):
        self._name = name
        return
    
    def name(self):
        return self._name

class MoveNames:
    ATTACK = "Attack"
    HOMING_FIRE = "Homing Fire"
    BLINDING_DARKNESS = "Blinding Darkness"

class MoveData:
    data = [
            {
                'name': MoveNames.ATTACK
            },
            {
                'name': MoveNames.HOMING_FIRE
            },
            {
                'name': MoveNames.BLINDING_DARKNESS
            },
        ]

class MoveFactory:
    def __init__(self, data):
        self._templates = {}
        for move_data in data:
            move = Move(move_data['name'])
            self._templates[move_data['name']] = move
        return
    
    def getMove(self, name):
        return deepcopy(self._templates[name])
