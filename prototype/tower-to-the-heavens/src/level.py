'''
@author: Richard Douglas
Created on Aug 19, 2018
'''
from battle import Battle


class Level:
    def __init__(self, args):
        self.name = lambda: args['name']
        self.index = lambda: args['index']
        self.units = lambda: tuple(args['units'])
        return
    
    def generate_battle(self, lucy_battler):
        return Battle({'lucy': lucy_battler,
                       'enemies':tuple(un.generate_battler() for un in self.units())})
