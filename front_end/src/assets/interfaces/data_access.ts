import { DictNumber } from "./patterns";

type ArchiverRawArray = [string, {
  severity: number,
  val: number,
  nanos: number
}]

type DBRType =
  | "DBR_SCALAR_BYTE"
  | "DBR_SCALAR_DOUBLE"
  | "DBR_SCALAR_ENUM"
  | "DBR_SCALAR_FLOAT"
  | "DBR_SCALAR_INT"
  | "DBR_SCALAR_SHORT"
  | "DBR_SCALAR_STRING"
  | "DBR_V4_GENERIC_BYTES"
  | "DBR_WAVEFORM_BYTE"
  | "DBR_WAVEFORM_DOUBLE"
  | "DBR_WAVEFORM_ENUM"
  | "DBR_WAVEFORM_FLOAT"
  | "DBR_WAVEFORM_INT"
  | "DBR_WAVEFORM_SHORT"
  | "DBR_WAVEFORM_STRING";

interface ArchiverDataPoint {
  x: Date;
  y: number;
}

interface ArchiverListRaw {
  [key: string]:
    {
      severity: number,
      val: number,
      nanos: number
    }
}

interface ArchiverMetadata {
  hostName: string;
  paused: boolean;
  computedEventRate: number;
  samplingMethod: "SCAN" | "MONITOR";
  samplingPeriod: number;
  applianceIdentity: string;
  pvName: string;
  scalar: boolean;
  EGU: string;
  PREC: number;
  NELM: number;
  DBRType: DBRType;
}

interface ArchiverData {
  meta: { name: string; PREC: string };
  data: ArchiverDataPoint[];
}

interface DataAccess {
  fetchSeveralPV(pv: Array<string>, date: Date): Promise<DictNumber>;
  fetchData(pv: string, from: Date, to: Date, optimization: number): Promise<ArchiverData>;
}

interface DataAccessFactory {
  (): DataAccess;
}

export type {
  ArchiverRawArray,
  ArchiverDataPoint,
  ArchiverListRaw,
  ArchiverMetadata,
  ArchiverData,
  DataAccess,
  DataAccessFactory
}
