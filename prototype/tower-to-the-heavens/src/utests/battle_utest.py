'''
@author: Richard Douglas
Created on Aug 19, 2018
'''
import unittest
from game import Game
from battle import BattleNames
from unit import UnitNames


class Test(unittest.TestCase):
    def testBattleCreation(self):
        factory = Game.get_game_factory()
        
        battle1 = factory.getBattle(BattleNames.BATTLE_1)
        self.assertEqual(BattleNames.BATTLE_1, battle1.name())
        self.assertEqual(1, battle1.index())
        self.assertEqual((UnitNames.FIRE_MAGE, UnitNames.FIRE_MAGE, UnitNames.FIRE_MAGE),
                         tuple(un.name() for un in battle1.units()))
        
        battle2 = factory.getBattle(BattleNames.BATTLE_2)
        self.assertEqual(BattleNames.BATTLE_2, battle2.name())
        self.assertEqual(2, battle2.index())
        self.assertEqual((UnitNames.BATUMAN,), tuple(un.name() for un in battle2.units()))
        
        battle3 = factory.getBattle(BattleNames.BATTLE_3)
        self.assertEqual(BattleNames.BATTLE_3, battle3.name())
        self.assertEqual(3, battle3.index())
        self.assertEqual((UnitNames.FIRE_MAGE, UnitNames.BATUMAN, UnitNames.FIRE_MAGE),
                         tuple(un.name() for un in battle3.units()))
        return

if __name__ == "__main__":
    unittest.main()