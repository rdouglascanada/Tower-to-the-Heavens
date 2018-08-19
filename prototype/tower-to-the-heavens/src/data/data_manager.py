'''
@author: Richard Douglas
Created on Aug 19, 2018
'''
class DataManager:
    _singleton = None
    
    def __init__(self, args):
        self._status_templates = {}
        self._load_status_data(args['status_data'])
        self._move_templates = {}
        self._load_move_data(args['move_data'])
        self._unit_templates = {}
        self._load_unit_data(args['unit_data'])
        self._level_templates = {}
        self._load_level_data(args['level_data'])
        return
    
    def getStatus(self, name):
        return self._status_templates[name]
    
    def getMove(self, name):
        return self._move_templates[name]
    
    def getUnit(self, name):
        return self._unit_templates[name]
    
    def getLevel(self, name):
        return self._level_templates[name]
    
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
    
    def _load_level_data(self, data):
        from level import Level
        for level_data in data:
            level_data['units'] = tuple(self.getUnit(unit_name) for unit_name in level_data['unit_names'])
            self._level_templates[level_data['name']] = Level(level_data)
        return

def get_data_manager():
        if not DataManager._singleton:
            from data import MoveData, StatusData, UnitData, LevelData
            DataManager._singleton = DataManager({
                'status_data': StatusData.data,
                'move_data': MoveData.data,
                'unit_data': UnitData.data,
                'level_data': LevelData.data
            })
        return DataManager._singleton
