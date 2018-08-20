'''
@author: Richard Douglas
Created on Aug 19, 2018
'''
class Battle:
    def __init__(self, args):
        self.lucy = lambda: args['lucy']
        self.enemies = lambda: tuple(args['enemies'])
        return
    
    def is_won(self):
        return all((enemy.is_dead() for enemy in self.enemies()))
    
    def is_lost(self):
        return self.lucy().is_dead()