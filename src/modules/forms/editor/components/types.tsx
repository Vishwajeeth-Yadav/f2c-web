export interface Field {
    id: string;
    type: string;
    label: string;
    placeholder?: string;
    options?: { value: string; label: string }[];
    rowId?:string;
    order?: number; 
    required:boolean;
  }
