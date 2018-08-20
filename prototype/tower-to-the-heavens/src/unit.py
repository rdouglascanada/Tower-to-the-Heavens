'''
@author: Richard Douglas
Created on Aug 18, 2018
'''
from battler import Battler

class Unit:
    def __init__(self, args):
        self.name = lambda: args['name']
        self.index = lambda: args['index']
        self.max_hitpoints = lambda: args['max_hitpoints']
        self.power = lambda: args['power']
        self.moves = lambda: tuple(args['moves'])
        return
    
    def generate_battler(self):
        return Battler({'unit': self, 'hitpoints': self.max_hitpoints()})
