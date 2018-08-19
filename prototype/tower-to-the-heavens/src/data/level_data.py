'''
@author: Richard Douglas
Created on Aug 19, 2018
'''
from unit_data import UnitNames

class LevelNames:
    LEVEL_1 = "1"
    LEVEL_2 = "2"
    LEVEL_3 = "3"

class LevelData:
    data = [
            {
                'name': LevelNames.LEVEL_1,
                'index': 1,
                'unit_names': [UnitNames.FIRE_MAGE, UnitNames.FIRE_MAGE, UnitNames.FIRE_MAGE],
            },
            {
                'name': LevelNames.LEVEL_2,
                'index': 2,
                'unit_names': [UnitNames.BATUMAN],
            },
            {
                'name': LevelNames.LEVEL_3,
                'index': 3,
                'unit_names': [UnitNames.FIRE_MAGE, UnitNames.BATUMAN, UnitNames.FIRE_MAGE],
            },
        ]