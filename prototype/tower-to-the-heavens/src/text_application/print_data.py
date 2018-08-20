'''
@author: Richard Douglas
Created on Aug 19, 2018
'''
from data import get_data_manager

data_manager = get_data_manager()
for item in (("Levels", data_manager.getLevels()), ("Units", data_manager.getUnits()),
             ("Moves", data_manager.getMoves()), ("Status Effects", data_manager.getStatuses())):
    print(item[0])
    print("---------------")
    print(tuple(it.name() for it in item[1]))
    print