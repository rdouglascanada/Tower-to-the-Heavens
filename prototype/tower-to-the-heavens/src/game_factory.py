'''
@author: Richard Douglas
Created on Aug 18, 2018
'''
from unit import Unit
from move import Move
from status import StatusEffect

class GameFactory:
    def __init__(self, status_data, move_data, unit_data):
        self._status_templates = {}
        self._move_templates = {}
        self._unit_templates = {}
        self._load_status_data(status_data)
        self._load_move_data(move_data)
        self._load_unit_data(unit_data)
        return
    
    def getStatus(self, name):
        return self._status_templates[name]
    
    def getMove(self, name):
        return self._move_templates[name]
    
    def getUnit(self, name):
        return self._unit_templates[name]
    
    def _load_status_data(self, data):
        for status_data in data:
            self._status_templates[status_data['name']] = StatusEffect(status_data)
        return
    
    def _load_move_data(self, data):
        for move_data in data:
            move_data['status_effect'] = self.getStatus(move_data['status_name'])
            self._move_templates[move_data['name']] = Move(move_data)
        return
    
    def _load_unit_data(self, data):
        for unit_data in data:
            unit_data['moves'] = tuple(self.getMove(move_name) for move_name in unit_data['move_names'])
            self._unit_templates[unit_data['name']] = Unit(unit_data)
        return
