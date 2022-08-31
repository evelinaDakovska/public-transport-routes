interface SegmentsInterface {
  id: string;
  name: string;
  averagePeople: number | string;
  averageCrowding: number | string;
  dataPoints: number;
  coordinates: LocationInterface[];
}

export interface LocationInterface {
  lat: number;
  lon: number;
}

interface StopsInterface {
  id: string;
  name: string;
  averagePeople: number | string;
  dataPoints: number;
  location: LocationInterface;
}

interface RoutesInterface {
  transportType: string;
  id: number;
  averagePeople: number | string;
  averageCrowding: number | string;
  dataPoints: number;
  stops: StopsInterface[];
  segments: SegmentsInterface[];
  name: string;
}

export interface DataState {
  line: string;
  routes: RoutesInterface[];
}
