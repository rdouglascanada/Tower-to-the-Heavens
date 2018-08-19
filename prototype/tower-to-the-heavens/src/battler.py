'''
@author: Richard Douglas
Created on Aug 18, 2018
'''
class Battler:
    def __init__(self, args):
        self.unit = lambda: args['unit']
        self.name = lambda: self.unit().name()
        self._hitpoints = args['hitpoints']
        self.hitpoints = lambda: self._hitpoints
        self.max_hitpoints = lambda: self.unit().max_hitpoints()
        self.moves = lambda: self.unit().moves()
        return
    
    def take_damage(self, damage):
        self._hitpoints -= damage
        self._hitpoints = max(self._hitpoints, 0)
        return
    
    def is_alive(self):
        return self.hitpoints() > 0
