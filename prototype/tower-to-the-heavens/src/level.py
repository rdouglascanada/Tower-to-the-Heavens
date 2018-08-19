'''
@author: Richard Douglas
Created on Aug 19, 2018
'''
class Level:
    def __init__(self, args):
        self.name = lambda: args['name']
        self.index = lambda: args['index']
        self.units = lambda: tuple(args['units'])
        return
