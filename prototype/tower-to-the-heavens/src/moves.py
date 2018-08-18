'''
moves.py

@author: Richard Douglas
Created on Aug 18, 2018
'''
class Move:
    def __init__(self, args):
        self.name = lambda: args['name']
        self.cost = lambda: args['cost']
        self.damage = lambda: args['damage']
        return

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
            move = Move(move_data)
            self._templates[move_data['name']] = move
        return
    
    def getMove(self, name):
        return self._templates[name]
