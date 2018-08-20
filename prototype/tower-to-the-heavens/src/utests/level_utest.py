'''
@author: Richard Douglas
Created on Aug 19, 2018
'''
import unittest
from data import get_data_manager, LevelNames, UnitNames


class Test(unittest.TestCase):
    def testLevelCreation(self):
        data_manager = get_data_manager()
        
        level1 = data_manager.getLevel(LevelNames.LEVEL_1)
        self.assertEqual(LevelNames.LEVEL_1, level1.name())
        self.assertEqual(1, level1.index())
        self.assertEqual((UnitNames.FIRE_MAGE, UnitNames.FIRE_MAGE, UnitNames.FIRE_MAGE),
                         tuple(un.name() for un in level1.units()))
        
        level2 = data_manager.getLevel(LevelNames.LEVEL_2)
        self.assertEqual(LevelNames.LEVEL_2, level2.name())
        self.assertEqual(2, level2.index())
        self.assertEqual((UnitNames.BATUMAN,), tuple(un.name() for un in level2.units()))
        
        level3 = data_manager.getLevel(LevelNames.LEVEL_3)
        self.assertEqual(LevelNames.LEVEL_3, level3.name())
        self.assertEqual(3, level3.index())
        self.assertEqual((UnitNames.FIRE_MAGE, UnitNames.BATUMAN, UnitNames.FIRE_MAGE),
                         tuple(un.name() for un in level3.units()))
        return
    
    def testGenerateBattle(self):
        data_manager = get_data_manager()
        
        lucy_battler = data_manager.getUnit(UnitNames.LUCY).generate_battler()
        level3 = data_manager.getLevel(LevelNames.LEVEL_3)
        battle = level3.generate_battle(lucy_battler)
        
        self.assertEqual((UnitNames.FIRE_MAGE, UnitNames.BATUMAN, UnitNames.FIRE_MAGE),
                         tuple(en.name() for en in battle.enemies()))
        self.assertEqual(False, battle.is_won())
        self.assertEqual(False, battle.is_lost())
        return

if __name__ == "__main__":
    unittest.main()