'''
@author: Richard Douglas
Created on Aug 19, 2018
'''
from unit import UnitNames

class Battle:
    def __init__(self, args):
        self.name = lambda: args['name']
        self.index = lambda: args['index']
        self.units = lambda: tuple(args['units'])
        return

class BattleNames:
    BATTLE_1 = "1"
    BATTLE_2 = "2"
    BATTLE_3 = "3"

class BattleData:
    data = [
            {
                'name': BattleNames.BATTLE_1,
                'index': 1,
                'unit_names': [UnitNames.FIRE_MAGE, UnitNames.FIRE_MAGE, UnitNames.FIRE_MAGE],
            },
            {
                'name': BattleNames.BATTLE_2,
                'index': 2,
                'unit_names': [UnitNames.BATUMAN],
            },
            {
                'name': BattleNames.BATTLE_3,
                'index': 3,
                'unit_names': [UnitNames.FIRE_MAGE, UnitNames.BATUMAN, UnitNames.FIRE_MAGE],
            },
        ]