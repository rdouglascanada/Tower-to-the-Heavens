'''
@author: Richard Douglas
Created on Aug 18, 2018
'''
import unittest
from status import StatusData, StatusFactory, StatusNames


class Test(unittest.TestCase):
    def testStatusCreation(self):
        factory = StatusFactory(StatusData.data)
        
        none_status = factory.getStatus(StatusNames.NONE)
        self.assertEqual(StatusNames.NONE, none_status.name())
        self.assertEqual(True, none_status.is_none())
        self.assertEqual(False, none_status.is_blind())
        
        blind_status = factory.getStatus(StatusNames.BLIND)
        self.assertEqual(StatusNames.BLIND, blind_status.name())
        self.assertEqual(False, blind_status.is_none())
        self.assertEqual(True, blind_status.is_blind())
        return

if __name__ == "__main__":
    unittest.main()