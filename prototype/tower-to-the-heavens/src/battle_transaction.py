'''
@author: Richard Douglas
Created on Aug 19, 2018
'''
class BattleTransactionItem:
    def __init__(self, source, target):
        self.source = lambda: source
        self.target = lambda: target
        return
    
    def summary(self):
        raise Exception("summary() must be overridden!")
    
    def apply(self):
        raise Exception("apply() must be overridden!")

class BattleDamageTransactionItem(BattleTransactionItem):
    def __init__(self, source, target, damage):
        BattleTransactionItem.__init__(self, source, target)
        self.damage = lambda: damage
        return
    
    def summary(self):
        return "{0} takes {1} damage".format(self.target().name(), self.damage())
    
    def apply(self):
        self.target().take_damage(self.damage())
        return
