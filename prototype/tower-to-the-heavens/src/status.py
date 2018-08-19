'''
@author: Richard Douglas
Created on Aug 18, 2018
'''
class StatusEffect:
    def __init__(self, args):
        self.name = lambda: args['name']
        self.is_none = lambda: args.get('is_none', False)
        self.is_blind = lambda: args.get('is_blind', False)
        return
