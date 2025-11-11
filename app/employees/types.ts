export interface Employee {
  id: number;
  nama: string;
  jabatan: string;
  gajiPokok: number;
  tglMasuk: string;
  status: string;

  agama?: string;
  tglLahir?: string;
  pendidikanTerakhir?: string;
  alamat?: string;
  keterangan?: string;
  statusPernikahan?: string;

  createdAt: string;
  updatedAt: string;
}
