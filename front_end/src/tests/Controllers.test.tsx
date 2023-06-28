import '@testing-library/jest-dom';
import * as time from '../controllers/time';
import * as patterns from '../controllers/patterns';
import * as bpm from '../controllers/bpm';
import * as fchart from '../controllers/chart';
import modal from "../controllers/Modals";
import chart from "../controllers/Chart";
import {buildDatasetOrbit} from '../controllers/orbit';

describe('Date/Time', () => {
  it("pastDate", () => {
    const dates: any = [
      ["2023-01-04T10:34:23Z", "2016-01-05T10:34:23Z", true],
      ["2043-01-05T10:34:23Z", "2016-01-04T10:34:23Z", false],
      ["2016-01-04T10:34:24Z", "2050-01-04T10:34:23Z", false],
      ["2053-01-04T10:34:23Z", "2072-01-04T10:35:23Z", false],
      ["2020-01-04T10:34:23Z", "2021-01-04T11:34:23Z", true]
    ]
    for(let id=0; id<5; id++){
      const start = new Date(dates[id][0]);
      const end = new Date(dates[id][1]);
      const res = time.pastDate(start, end)
      expect(res).toEqual(dates[id][2])
    }
  })

  it("validInterval", () => {
    const dates: any = [
      ["2016-01-04T10:34:23Z", "2016-01-05T10:34:23Z", true],
      ["2016-01-05T10:34:23Z", "2016-01-04T10:34:23Z", false],
      ["2016-01-04T10:34:24Z", "2016-01-04T10:34:23Z", false],
      ["2016-01-04T10:34:23Z", "2016-01-04T10:35:23Z", true],
      ["2016-01-04T10:34:23Z", "2016-01-04T11:34:23Z", true]
    ]
    for(let id=0; id<5; id++){
      const start = new Date(dates[id][0]);
      const end = new Date(dates[id][1]);
      const res = time.validInterval(start, end)
      expect(res).toEqual(dates[id][2])
    }
  })

  it("getClosestDate", async () => {
    const dataPoint = [
        {x:new Date("2016-01-05T10:34:23Z"), y: 1.4},
        {x:new Date("2016-01-05T11:34:23Z"), y: 0.9},
        {x:new Date("2016-01-05T12:34:23Z"), y: 1.1},
        {x:new Date("2016-01-05T13:34:23Z"), y: 1.8},
        {x:new Date("2016-01-05T14:34:23Z"), y: 0.4}
    ]
    const dates: any = [
        [["2016-01-05T10:34:23Z", "2016-01-05T20:34:23Z", "2016-01-05T13:39:23Z"], 1.8],
        [["2016-01-05T09:34:23Z", "2016-01-05T20:34:23Z", "2016-01-05T11:32:23Z"], 0.9],
        [["2016-01-05T09:34:23Z", "2016-01-05T20:34:23Z", "2016-01-05T11:00:23Z"], 1.4],
    ]

    for(let id=0; id<3; id++){
        let list_str = dates[id][0]
        let dates_list = new Array(3)
        for(let j=0; j<3; j++){
            dates_list[j] = new Date(list_str[j])
        }
        const res = await time.getClosestDate('FAKE:PV', dataPoint, dates_list)
        expect(res).toEqual(dates[id][1])
    }
  })

  it("getIntervalFromMilliseconds", () => {
    const param: any = [
      [3600000, "1h"],
      [60000, "1m"],
      [86400000, "1d"],
      [216000000, "2.5d"]
    ]
    for(let id=0; id<4; id++){
      const curr = param[id];
      const res = time.getIntervalFromMilliseconds(curr[0])
      expect(res).toEqual(curr[1])
    }
  })

  it("getTimeMilliseconds", () => {
    const param: any = [
      ["Second", 1000],
      ["Hour", 3600000],
      ["Day", 86400000],
      ["Week", 604800000],
      ["Month", 2592000000]
    ]
    for(let id=0; id<5; id++){
      const curr = param[id];
      const res = time.getTimeMilliseconds(curr[0])
      expect(res).toEqual(curr[1])
    }
  })

  it("getDate", () => {
    const base_dates: any =  {
      start: new Date("2016-01-05T10:34:23Z"),
      end: new Date("2016-01-05T11:34:23Z"),
      refDate: new Date("2016-01-05T10:54:23Z"),
      timeRef: 3600000
    }
    const param: any = [
      ["Start", base_dates.start],
      ["End", base_dates.end],
      ["Ref", base_dates.refDate]
    ]
    for(let id=0; id<3; id++){
      const curr = param[id];
      const res = time.getDate(base_dates, curr[0])
      expect(res).toEqual(curr[1])
    }
  })

  it("getNewTimeInterval", () => {
    const param: any = [
      [60000, new Date("2016-01-05T10:34:23Z"), 'End', new Date("2016-01-05T10:33:23Z")],
      [3600000, new Date("2016-01-05T10:34:23Z"), 'Start', new Date("2016-01-05T11:34:23Z")],
      [300000, new Date("2016-01-05T10:34:23Z"), 'Start', new Date("2016-01-05T10:39:23Z")],
      [7776000000, new Date("2016-01-05T10:34:23Z"), 'End', new Date("2015-10-07T10:34:23Z")]
    ]
    for(let id=0; id<4; id++){
      const curr = param[id];
      const res = time.getNewTimeInterval(curr[0], curr[1], curr[2])
      expect(res).toEqual(curr[3])
    }
  })
})


describe('Patterns', () => {
  it("changeStates", () => {
    const param: any = [
      [3, 5],
      ["Orbit", "Monitor"],
      [324, "Sirius"],
      [["LOCO", "RAD"], [1, 3]]
    ]
    for(let id=0; id<4; id++){
      const [stateIni, stateEnd] = param[id];
      const [state1, state2] = patterns.changeStates(stateIni, stateEnd)
      expect(state1).toEqual(stateEnd)
      expect(state2).toEqual(stateIni)
    }
  })

  it("reverseAxis", () => {
    expect(patterns.reverseAxis('X')).toEqual('Y')
    expect(patterns.reverseAxis('Y')).toEqual('X')
  })

  it("sortList", () => {
    const list: any = [
      ["Item 92", "Dipole", "X", 1.3, 92.4],
      ["Item 23", "Quadrupole", "Y", 0.3, 73.4],
      ["Item 12", "Corrector", "Y", 1.7, 4.2],
      ["Item 43", "Dipole", "X", 0.3, 53.4]
    ]
    const sorted = [
      [["Item 12", "Corrector", "Y", 1.7, 4.2],
        ["Item 23", "Quadrupole", "Y", 0.3, 73.4],
        ["Item 43", "Dipole", "X", 0.3, 53.4],
        ["Item 92", "Dipole", "X", 1.3, 92.4]],
      [["Item 12", "Corrector", "Y", 1.7, 4.2],
        ["Item 43", "Dipole", "X", 0.3, 53.4],
        ["Item 92", "Dipole", "X", 1.3, 92.4],
        ["Item 23", "Quadrupole", "Y", 0.3, 73.4]],
      [["Item 43", "Dipole", "X", 0.3, 53.4],
        ["Item 92", "Dipole", "X", 1.3, 92.4],
        ["Item 12", "Corrector", "Y", 1.7, 4.2],
        ["Item 23", "Quadrupole", "Y", 0.3, 73.4]],
      [["Item 43", "Dipole", "X", 0.3, 53.4],
        ["Item 23", "Quadrupole", "Y", 0.3, 73.4],
        ["Item 92", "Dipole", "X", 1.3, 92.4],
        ["Item 12", "Corrector", "Y", 1.7, 4.2]],
      [["Item 12", "Corrector", "Y", 1.7, 4.2],
        ["Item 43", "Dipole", "X", 0.3, 53.4],
        ["Item 23", "Quadrupole", "Y", 0.3, 73.4],
        ["Item 92", "Dipole", "X", 1.3, 92.4]]
    ]

    for(let id=0; id<4; id++){
      const sorted_list = patterns.sortList(list, id)
      expect(sorted_list).toEqual(sorted[id])
    }
  })
})


describe('Orbit', () => {
  it("buildDatasetOrbit", () => {
    const dataList = [0.102, 0.523, 0.023, 0.523, 0.234, 0];
    const finalList = [
      {x: "01M2", y: 0.102},
      {x: "01C1-1", y: 0.523},
      {x: "01C1-2", y: 0.023},
      {x: "01C2", y: 0.523},
      {x: "01C3-1", y: 0.234},
      {x: "01C3-2", y: 0},
    ]
    const orbit_list = buildDatasetOrbit(dataList)
    expect(orbit_list).toEqual(finalList)
  })
});

describe('BPM', () => {
  it("getBpmName", () => {
    const param: any = [
      ["X", "SI-01M2:DI-BPM", "SI-01M2:DI-BPM:PosX-Mon"],
      ["Y", "SI-01C1:DI-BPM-1", "SI-01C1:DI-BPM-1:PosY-Mon"],
      ["Y", "SI-18C4:DI-BPM", "SI-18C4:DI-BPM:PosY-Mon"],
      ["Y", "SI-08C3:DI-BPM-2", "SI-08C3:DI-BPM-2:PosY-Mon"],
      ["X", "SI-05M2:DI-BPM", "SI-05M2:DI-BPM:PosX-Mon"]]
    for(let id=0; id<5; id++){
      const [axis, name, real_name] = param[id];
      const bpm_name = bpm.getBpmName(name, axis);
      expect(bpm_name).toEqual(real_name);
    }
  })

  it("formatBPMName", () => {
    const param: any = [
      ["SI-01M2:DI-BPM:PosX-Mon", "01M2:PosX"],
      ["SI-01C1:DI-BPM-1:PosY-Mon", "01C1-1:PosY"],
      ["SI-18C4:DI-BPM:PosY-Mon", "18C4:PosY"],
      ["SI-08C3:DI-BPM-2:PosY-Mon", "08C3-2:PosY"],
      ["SI-05M2:DI-BPM:PosX-Mon", "05M2:PosX"]]
    for(let id=0; id<5; id++){
      const [name, real_name] = param[id];
      const bpm_name = bpm.formatBPMName(name);
      expect(bpm_name).toEqual(real_name);
    }
  })

  it("getSectionAndName", () => {
    const param: any = [
      ["SI-01M2:DI-BPM:PosX-Mon", ["01", "M2"]],
      ["SI-01C1:DI-BPM-1:PosY-Mon", ["01", "C1-1"]],
      ["SI-18C4:DI-BPM:PosY-Mon", ["18", "C4"]],
      ["SI-08C3:DI-BPM-2:PosY-Mon", ["08", "C3-2"]],
      ["SI-05M2:DI-BPM:PosX-Mon", ["05", "M2"]]
    ]

    for(let id=0; id<5; id++){
      const [name, sect_name] = param[id];
      const bpm_name = bpm.getSectionAndName(name);
      expect(bpm_name).toEqual(sect_name);
    }
  })

  it("buildBPMName", () => {
    const param: any = [
      ["01", "M2", "SI-01M2:DI-BPM"],
      ["01", "C1-1", "SI-01C1:DI-BPM-1"],
      ["18", "C4", "SI-18C4:DI-BPM"],
      ["08", "C3-2", "SI-08C3:DI-BPM-2"],
      ["05", "M2", "SI-05M2:DI-BPM"]]
    for(let id=0; id<5; id++){
      const [sect, name, real_name] = param[id];
      const bpm_name = bpm.buildBPMName(sect, name);
      expect(bpm_name).toEqual(real_name);
    }
  })

  it("differentiateData", async () => {
    const data: any = [
      {x:new Date("2016-01-05T10:34:23Z"), y: 1.4},
      {x:new Date("2016-01-05T11:34:23Z"), y: 0.9},
      {x:new Date("2016-01-05T12:34:23Z"), y: 1.1},
      {x:new Date("2016-01-05T13:34:23Z"), y: 1.8},
      {x:new Date("2016-01-05T14:34:23Z"), y: 0.4}
    ]
    const diff_data = [
      {x:new Date("2016-01-05T10:34:23Z"), y: -0.4},
      {x:new Date("2016-01-05T11:34:23Z"), y: -0.9},
      {x:new Date("2016-01-05T12:34:23Z"), y: -0.7},
      {x:new Date("2016-01-05T13:34:23Z"), y: 0},
      {x:new Date("2016-01-05T14:34:23Z"), y: -1.4}
    ]
    const dates_list = [
      new Date("2016-01-05T10:34:23Z"),
      new Date("2016-01-05T14:34:23Z"),
      new Date("2016-01-05T13:06:23Z"),
    ]
    const diff_list = await bpm.differentiateData(
      data, "FAKE:PV", dates_list);
    expect(diff_list).toEqual(diff_data);
  })

  it("isBPMName", () => {
    const param: any = [
      ["SI-01M2:DI-BPM", true],
      ["FANDOM:PV:PosX-Mon", false],
      ["SI-18C4:DI-BPM", true],
      ["SI-08C3:DI-BPM-2", true],
      ["RAD:Thermo10:Gamma:Dose", false]
    ]

    for(let id=0; id<5; id++){
      const [name, isBPM] = param[id];
      const bpm_name = bpm.isBPMName(name);
      expect(bpm_name).toEqual(isBPM);
    }
  })
});

describe('Modals', () => {
  it("id", () => {
    const param = ["K10:", "2K3P", "5F2", "8LK", "R93"]
    const read_back = modal.getModalId();
    expect(read_back).toEqual("BPM");
    for(let id=0; id<5; id++){
      modal.setModalId(param[id]);
      const read_back = modal.getModalId();
      expect(read_back).toEqual(param[id]);
    }
  })

  it("state", () => {
    const param = [true, false, true, false, true];
    const read_back = modal.getModalState();
    expect(read_back).toEqual(false);
    for(let id=0; id<6; id++){
      modal.setModalState(param[id]);
      const read_back = modal.getModalState();
      expect(read_back).toEqual(param[id]);
    }
  })

  it("styling", () => {
    const param = ["alert", "normal", "modal"];
    const read_back = modal.getModalStyling();
    expect(read_back).toEqual("normal");
    for(let id=0; id<6; id++){
      modal.setModalStyling(param[id]);
      const read_back = modal.getModalStyling();
      expect(read_back).toEqual(param[id]);
    }
  })

  it("timeout", () => {
    const param = [true, false, true, false, true];
    const read_back = modal.getModalTimeout();
    expect(read_back).toEqual(false);
    for(let id=0; id<6; id++){
      modal.setModalTimeout(param[id]);
      const read_back = modal.getModalTimeout();
      expect(read_back).toEqual(param[id]);
    }
  })
});


describe('Chart', () => {
  it("getColor", () => {
    const param = [
      ["cod_rebuilt", "#000000"],
      ["SI-08C3:DI-BPM-2:PosY-Mon", "#D5565D"],
      ["SI-18C4:DI-BPM:PosY-Mon", "#F44E4F"]];
    for(let id=0; id<3; id++){
      const color = fchart.getColor(param[id][0]);
      expect(color).toEqual(param[id][1]);
    }
  })

  it("setColor", () => {
    const color = "#D5565D";
    const state = fchart.setAxisColor("SI-08C3:DI-BPM-2:PosY-Mon", {
      data: [],
      xAxisID: '',
      label: ''
    });
    expect(state.backgroundColor).toEqual(color);
    expect(state.borderColor).toEqual(color);
  })

  it("getAxisColors", () => {
    const color_list = {
      "cod_rebuilt": "#000000",
      "SI-08C3:DI-BPM-2:PosY-Mon": "#D5565D",
      "SI-18C4:DI-BPM:PosY-Mon": "#F44E4F"
    };
    const axis_colors = chart.getAxisColors()
    expect(axis_colors).toEqual(color_list);
  })

  it("setDataset", () => {
    const dataset: any = [{
      data: [1, 2, 3],
      xAxisID: '',
      label: 'BPM1'
    },
    {
      data: [1, 2, 3],
      xAxisID: '',
      label: 'BPM2'
    }];
    chart.setDataset(dataset, 'X')
    expect(dataset).toEqual(chart.getDatasetByIdx(0));

    chart.setDataset(dataset, 'Y')
    expect(dataset).toEqual(chart.getDatasetByIdx(1));
  })

  it("detectNewData", () => {
    const data2Detect = ["BPM1", "BPM7", "BPM4", "BPM2"];
    for(let i=0; i<4; i++){
      let result;
      if(i==0 || i==3){
        result = {
          data: [1, 2, 3],
          xAxisID: '',
          label: data2Detect[i]
        };
      }else{
        result = null;
      }
      const item = chart.detectNewData(
        data2Detect[i], false, 'X');
      expect(item).toEqual(result);
    }
  })
});
