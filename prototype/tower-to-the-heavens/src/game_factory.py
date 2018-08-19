'''
@author: Richard Douglas
Created on Aug 18, 2018
'''
class GameFactory:
    def __init__(self, args):
        self._status_templates = {}
        self._load_status_data(args['status_data'])
        self._move_templates = {}
        self._load_move_data(args['move_data'])
        self._unit_templates = {}
        self._load_unit_data(args['unit_data'])
        self._battle_templates = {}
        self._load_battle_data(args['battle_data'])
        return
    
    def getStatus(self, name):
        return self._status_templates[name]
    
    def getMove(self, name):
        return self._move_templates[name]
    
    def getUnit(self, name):
        return self._unit_templates[name]
    
    def getBattle(self, name):
        return self._battle_templates[name]
    
    def _load_status_data(self, data):
        from status import StatusEffect
        for status_data in data:
            self._status_templates[status_data['name']] = StatusEffect(status_data)
        return
    
    def _load_move_data(self, data):
        from move import Move
        for move_data in data:
            move_data['status_effect'] = self.getStatus(move_data['status_name'])
            self._move_templates[move_data['name']] = Move(move_data)
        return
    
    def _load_unit_data(self, data):
        from unit import Unit
        for unit_data in data:
            unit_data['moves'] = tuple(self.getMove(move_name) for move_name in unit_data['move_names'])
            self._unit_templates[unit_data['name']] = Unit(unit_data)
        return
    
    def _load_battle_data(self, data):
        from battle import Battle
        for battle_data in data:
            battle_data['units'] = tuple(self.getUnit(unit_name) for unit_name in battle_data['unit_names'])
            self._battle_templates[battle_data['name']] = Battle(battle_data)
        return
