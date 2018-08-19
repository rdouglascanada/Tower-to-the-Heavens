'''
@author: Richard Douglas
Created on Aug 18, 2018
'''
from status import StatusNames
from battle_transaction import BattleDamageTransactionItem


class Move:
    def __init__(self, args):
        self.name = lambda: args['name']
        self.cost = lambda: args['cost']
        self.damage = lambda: args['damage']
        self.status_effect = lambda: args['status_effect']
        return
    
    def generate_transaction(self, source, target):
        return (BattleDamageTransactionItem(source, target, self.damage()),)

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