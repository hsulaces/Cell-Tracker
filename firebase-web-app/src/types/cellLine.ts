export type CellLine = {
  id: number;
  name: string;
  type: string;
  passage: number;
  confluence: number;
  growthRate: number;
  lastUpdate: string;
  lastPassageDate: string;
  status: string;
  medium: string;
  notes: string;
  reporters: string[];
};

export type CellLineFormState = {
  name: string;
  type: string;
  passage: string;
  confluence: string;
  growthRate: string;
  medium: string;
  reporters: string[];
  notes: string;
};