'''
@author: Richard Douglas
Created on Aug 18, 2018
'''
import unittest
from moves import MoveData, MoveFactory, MoveNames

class Test(unittest.TestCase):
    def testMoveCreation(self):
        factory = MoveFactory(MoveData.data)
        
        attack = factory.getMove(MoveNames.ATTACK)
        self.assertEqual(MoveNames.ATTACK, attack.name())
        self.assertEqual(0, attack.cost())
        
        homing_fire = factory.getMove(MoveNames.HOMING_FIRE)
        self.assertEqual(MoveNames.HOMING_FIRE, homing_fire.name())
        self.assertEqual(10, homing_fire.cost())
        
        blinding_darkness = factory.getMove(MoveNames.BLINDING_DARKNESS)
        self.assertEqual(MoveNames.BLINDING_DARKNESS, blinding_darkness.name())
        self.assertEqual(20, blinding_darkness.cost())
        return

if __name__ == "__main__":
    unittest.main()