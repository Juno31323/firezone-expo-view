export interface Marker {
    fz_id: number;
    fz_near_id: string;
    fz_loc_sn: number;
    si_nm: string;
    sig_nm: string;
    sig_sn: number;
    road_nm_addr: string;
    bldg_num_addr: string;
    fz_pk_unit: number;
    fz_geom: {
      type: string;
      coordinates: [number, number];
    };
  }