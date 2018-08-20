'''
@author: Richard Douglas
Created on Aug 18, 2018
'''
from battle_transaction import BattleDamageTransactionItem


class Move:
    def __init__(self, args):
        self.name = lambda: args['name']
        self.index = lambda: args['index']
        self.cost = lambda: args['cost']
        self.damage = lambda: args['damage']
        self.status_effect = lambda: args['status_effect']
        return
    
    def generate_transaction(self, source, target):
        return (BattleDamageTransactionItem(source, target, self.damage()),)
