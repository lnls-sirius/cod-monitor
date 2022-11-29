// File that contains the infomation for the date
import { BaseStrArrayDict } from '../interfaces/patterns';
import { IntervalModeInterface } from '../interfaces/date';

export const intervalDict: IntervalModeInterface = {
  'Start': {
    'Start': true,
    'End': false
  },
  'End': {
    'Start': false,
    'End': true
  },
  'None': {
    'Start': true,
    'End': true
  }
}

export const intervals: BaseStrArrayDict = {
    "30s": ["30", "Second"],
    "1m": ["1", "Minute"],
    "5m": ["5", "Minute"],
    "1h": ["1", "Hour"],
    "2h": ["2", "Hour"],
    "4h": ["4", "Hour"],
    "8h": ["8", "Hour"],
    "12h": ["12", "Hour"],
    "18h": ["18", "Hour"],
    "1d": ["1", "Day"],
    "2.5d": ["2.5", "Day"],
    "1w": ["1", "Week"],
    "2w": ["2", "Week"],
    "1M": ['1', "Month"],
    "3M": ["3", "Month"],
    "6M": ["6", "Month"],
    "9M": ["9", "Month"],
    "1Y": ["1", "Year"]
}
