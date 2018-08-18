'''
moves.py

@author: Richard Douglas
Created on Aug 18, 2018
'''
from copy import deepcopy


class Move:
    def __init__(self, name, cost, damage):
        self._name = name
        self._cost = cost
        self._damage = damage
        return
    
    def name(self):
        return self._name
    
    def cost(self):
        return self._cost
    
    def damage(self):
        return self._damage

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
            },
            {
                'name': MoveNames.HOMING_FIRE,
                'cost': 10,
                'damage': 20,
            },
            {
                'name': MoveNames.BLINDING_DARKNESS,
                'cost': 20,
                'damage': 10,
            },
        ]

class MoveFactory:
    def __init__(self, data):
        self._templates = {}
        for move_data in data:
            move = Move(move_data['name'], move_data['cost'], move_data['damage'])
            self._templates[move_data['name']] = move
        return
    
    def getMove(self, name):
        return deepcopy(self._templates[name])
