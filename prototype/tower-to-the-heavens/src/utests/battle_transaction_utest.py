'''
@author: Richard Douglas
Created on Aug 19, 2018
'''
import unittest
from game import Game
from unit import UnitNames
from move import MoveNames


class Test(unittest.TestCase):
    def testSimpleBattle(self):
        factory = Game.get_game_factory()
        
        lucy_battler = factory.getUnit(UnitNames.LUCY).generate_battler()
        fire_mage_battler1 = factory.getUnit(UnitNames.FIRE_MAGE).generate_battler()
        fire_mage_battler2 = factory.getUnit(UnitNames.FIRE_MAGE).generate_battler()
        
        self.assertEqual(UnitNames.LUCY, lucy_battler.name())
        self.assertEqual(100, lucy_battler.hitpoints())
        self.assertEqual((MoveNames.ATTACK,), tuple(mv.name() for mv in lucy_battler.moves()))
        
        self.assertEqual(UnitNames.FIRE_MAGE, fire_mage_battler1.name())
        self.assertEqual(10, fire_mage_battler1.hitpoints())
        self.assertEqual((MoveNames.HOMING_FIRE,), tuple(mv.name() for mv in fire_mage_battler1.moves()))
        
        self.assertEqual(UnitNames.FIRE_MAGE, fire_mage_battler2.name())
        self.assertEqual(10, fire_mage_battler2.hitpoints())
        self.assertEqual((MoveNames.HOMING_FIRE,), tuple(mv.name() for mv in fire_mage_battler2.moves()))
        
        attack = factory.getMove(MoveNames.ATTACK)
        homing_fire = factory.getMove(MoveNames.HOMING_FIRE)
        
        attack_transaction = attack.generate_transaction(lucy_battler, fire_mage_battler1)
        self.assertEqual(1, len(attack_transaction))
        
        attack_transaction_item = attack_transaction[0]
        self.assertEqual("Fire Mage takes 10 damage", attack_transaction_item.summary())
        self.assertEqual(10, fire_mage_battler1.hitpoints())
        self.assertEqual(True, fire_mage_battler1.is_alive())
        attack_transaction_item.apply()
        self.assertEqual(0, fire_mage_battler1.hitpoints())
        self.assertEqual(False, fire_mage_battler1.is_alive())
        
        homing_fire_transaction = homing_fire.generate_transaction(fire_mage_battler2, lucy_battler)
        self.assertEqual(1, len(homing_fire_transaction))
        homing_fire_transaction_item = homing_fire_transaction[0]
        self.assertEqual("Lucy takes 20 damage", homing_fire_transaction_item.summary())
        self.assertEqual(100, lucy_battler.hitpoints())
        homing_fire_transaction_item.apply()
        self.assertEqual(80, lucy_battler.hitpoints())
        return

if __name__ == "__main__":
    unittest.main()