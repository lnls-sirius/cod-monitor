import { IntervalModeInterface, IntervalsInterface } from './interfaces';

export const TimeAxisID = "x-axis-0";
export const TimeAxisIndex = 0;

export const intervalDict: IntervalModeInterface = {
    'Start': {
      0: false,
      1: true,
      2: true
    },
    'End': {
      0: true,
      1: false,
      2: true
    }
}

export const refModes = [
  {
    mod: 'Start',
    ref: 'End'
  },
  {
    mod: 'End',
    ref: 'Start'
  }
];

export const intervals: IntervalsInterface = {
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
