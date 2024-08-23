<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="content">
    <BaseBlock title="" style="background-color: #edfcf0">
      <div class="row items-push">
        <div class="col-md-4">
          <BaseBlock
            tag="a"
            href="javascript:void(0)"
            class="text-center"
            link-shadow
          >
            <template #content>
              <div class="block-header" style="background-color: #006d32">
                <h1 class="block-title fs-4 fw-bold" style="color: white">
                  Surat Izin Praktik Refraksionis Optisi
                </h1>
              </div>

              <div class="block-content bg-body-light">
                <div class="py-2 text-start">
                  <p class="h4 fw-bold mb-2">Persyaratan</p>
                  <ol>
                    <li>Sudah terdaftar di Cabang akan praktek</li>
                    <li>
                      Mengisi dan mengupload Surat Permohonan Rekomendasi Surat
                      Ijin
                    </li>
                    <li>
                      Surat keterangan bekerja dari pimpinan sarana kesehatan.
                      Bagi refraksionis optisien/optometris yang lokasi sarana
                      kesehatannya berbeda dengan alamat KTP (Beda
                      Kabupaten/Kota) juga melampirkan:

                      <ol>
                        <li>Surat pindah anggota surat</li>
                        <li>
                          Keterangan domisili yang disahkan oleh kelurahan
                          sesuai wilayah cabang lokasi sarana kesehatan
                        </li>
                        <li>
                          Bukti transfer/kwitansi biaya administrasi rekomendasi
                          SIP sebesar Rp.100.000,00 (seratus ribu rupiah)
                        </li>
                      </ol>
                    </li>
                  </ol>
                  <!-- <p class="h6 text-muted">per month</p> -->
                </div>
              </div>

              <div class="block-content block-content-full bg-body-light">
                <RouterLink :to="{ name: 'backend-form-sip' }">
                  <span
                    class="btn btn-secondary px-4"
                    style="background-color: #006d32; color: white"
                  >
                    Ajukan Permohonan
                  </span>
                </RouterLink>
              </div>
            </template>
          </BaseBlock>
        </div>
        <div class="col-md-4">
          <BaseBlock
            tag="a"
            href="javascript:void(0)"
            class="text-center"
            link-shadow
          >
            <template #content>
              <div class="block-header" style="background-color: #006d32">
                <h1 class="block-title fs-4 fw-bold" style="color: white">
                  Surat Izin Penyelenggaraan Optik
                </h1>
              </div>

              <div class="block-content bg-body-light">
                <div class="py-2 text-start">
                  <p class="h4 fw-bold mb-2">Persyaratan</p>
                  <ol>
                    <li>Sudah terdaftar di Cabang akan praktek bekerja</li>
                    <li>
                      Mengisi dan mengupload Surat Ijin Peyelenggaraan Optik
                    </li>
                    <li>
                      Bukti transfer/kwitansi biaya administrasi rekomendasi SIP
                      sebesar Rp.100.000,00 (seratus ribu rupiah)
                    </li>
                    <li>
                      Murat Pernyataan Kesanggupan Bekerja atau Sebagai
                      Penanggungjawab Optik, yang ditandatangani dengan materai
                      Rp.6000,00
                    </li>
                    <li>
                      Bagi refraksionis optisien/optometris yang lokasi sarana
                      kesehatannya berbeda dengan alamat KTP (Beda
                      Kabupaten/Kota) juga melampirkan:

                      <ol>
                        <li>Surat pindah anggota surat</li>
                        <li>
                          Keterangan domisili yang disahkan oleh kelurahan
                          sesuai wilayah cabang lokasi sarana kesehatan
                        </li>
                      </ol>
                    </li>
                  </ol>
                  <!-- <p class="h6 text-muted">per month</p> -->
                </div>
              </div>

              <div class="block-content block-content-full bg-body-light">
                <RouterLink :to="{ name: 'backend-form-sipo' }">
                  <span
                    class="btn btn-secondary px-4"
                    style="background-color: #006d32; color: white"
                  >
                    Ajukan Permohonan
                  </span>
                </RouterLink>
              </div>
            </template>
          </BaseBlock>
        </div>

        <div class="col-md-4">
          <BaseBlock
            tag="a"
            href="javascript:void(0)"
            class="text-center"
            link-shadow
          >
            <template #content>
              <div class="block-header" style="background-color: #006d32">
                <h1 class="block-title fs-4 fw-bold" style="color: white">
                  Surat Permohonan Rekomendasi BPJS
                </h1>
              </div>

              <div class="block-content bg-body-light">
                <div class="py-2 text-start">
                  <p class="h4 fw-bold mb-2">Persyaratan</p>
                  <ol>
                    <li>Refraksionis dan Optisi sudah memiliki ijin</li>
                    <li>
                      Mengisi dan mengupload Surat Ijin Peyelenggaraan Optik
                    </li>
                    <li>
                      Bukti transfer/kwitansi biaya administrasi rekomendasi SIP
                      sebesar Rp.35.000,00 (tiga puluh lima ribu rupiah)
                    </li>
                    <li>
                      Surat Permohonan Rekomendasi Bekerjasama dengan BPJS
                    </li>
                  </ol>
                  <!-- <p class="h6 text-muted">per month</p> -->
                </div>
              </div>

              <div class="block-content block-content-full bg-body-light">
                <RouterLink :to="{ name: 'backend-form-rekomendasibpjs' }">
                  <span
                    class="btn btn-secondary px-4"
                    style="background-color: #006d32; color: white"
                  >
                    Ajukan Permohonan
                  </span>
                </RouterLink>
              </div>
            </template>
          </BaseBlock>
        </div>

        <div class="col-md-4">
          <BaseBlock
            tag="a"
            href="javascript:void(0)"
            class="text-center"
            link-shadow
          >
            <template #content>
              <div class="block-header" style="background-color: #006d32">
                <h1 class="block-title fs-4 fw-bold" style="color: white">
                  Surat Permohonan Pencabutan Izin Praktik
                </h1>
              </div>

              <div class="block-content bg-body-light">
                <div class="py-2 text-start">
                  <p class="h4 fw-bold mb-2">Persyaratan</p>
                  <ol>
                    <li>
                      Mengisi dan mengupload Surat Permohonan Rekomendasi
                      Mencabut SIP-RO
                    </li>
                    <li>
                      Mengisi dan mengupload Surat Pernyataan Mencabut SIP-RO
                    </li>
                  </ol>
                  <!-- <p class="h6 text-muted">per month</p> -->
                </div>
              </div>

              <div class="block-content block-content-full bg-body-light">
                <RouterLink :to="{ name: 'backend-form-pencabutansip' }">
                  <span
                    class="btn btn-secondary px-4"
                    style="background-color: #006d32; color: white"
                  >
                    Ajukan Permohonan
                  </span>
                </RouterLink>
              </div>
            </template>
          </BaseBlock>
        </div>

        <div class="col-md-4">
          <BaseBlock
            tag="a"
            href="javascript:void(0)"
            class="text-center"
            link-shadow
          >
            <template #content>
              <div class="block-header" style="background-color: #006d32">
                <h1 class="block-title fs-4 fw-bold" style="color: white">
                  Surat Permohonan Pindah Anggota Cabang
                </h1>
              </div>

              <div class="block-content bg-body-light">
                <div class="py-2 text-start">
                  <p class="h4 fw-bold mb-2">Persyaratan</p>
                  <ol>
                    <li>
                      Sudah terdaftar sebagai anggoota/berpraktek di cabang asal
                    </li>
                    <li>
                      Mengisi dan mengupload Surat Permohonan Pindah Anggota
                    </li>
                    <li>
                      Mengisi dan mengupload Surat Keterangan Bekerja dari
                      pimpinan sarana kesehatan yang dituju
                    </li>
                    <li>
                      Surat Keterangan domisili yang disahkan oleh kelurahan
                      sesuai wilayah cabang lokasi sarana kesehatan
                    </li>
                    <li>Kuitansi luas pembayaran iuran anggota</li>
                    <li>
                      Bukti transfer/kuitansi biaya administrasi surat pindah
                      anggota sebesar Rp.100.000,00
                    </li>
                  </ol>
                  <!-- <p class="h6 text-muted">per month</p> -->
                </div>
              </div>

              <div class="block-content block-content-full bg-body-light">
                <RouterLink :to="{ name: 'backend-form-pindahcabang' }">
                  <span
                    class="btn btn-secondary px-4"
                    style="background-color: #006d32; color: white"
                  >
                    Ajukan Permohonan
                  </span>
                </RouterLink>
              </div>
            </template>
          </BaseBlock>
        </div>

        <div class="col-md-4">
          <BaseBlock
            tag="a"
            href="javascript:void(0)"
            class="text-center"
            link-shadow
          >
            <template #content>
              <div class="block-header" style="background-color: #006d32">
                <h1 class="block-title fs-4 fw-bold" style="color: white">
                  Surat Pengantar Perpanjangan STR
                </h1>
              </div>

              <div class="block-content bg-body-light">
                <div class="py-2 text-start">
                  <p class="h4 fw-bold mb-2">Persyaratan</p>
                  <ol>
                    <li>Surat Pengantar dari Pengcab</li>
                    <li>Surat Pernyataan Patuh Etika Profesi</li>
                    <li>
                      Bukti transfer/kwitansi biaya administrasi perpanjangan
                      STR sebesar Rp.50.000,00 (lima puluh ribu rupiah)
                    </li>
                    <li>
                      Kwitansi Lunas Iuran Anggota minimal dalam Masa Period STR
                      atau Bukti Transfer Iuran PENGDA.
                    </li>
                  </ol>
                  <!-- <p class="h6 text-muted">per month</p> -->
                </div>
              </div>

              <div class="block-content block-content-full bg-body-light">
                <RouterLink :to="{ name: 'backend-form-perpanjanganstr' }">
                  <span
                    class="btn btn-secondary px-4"
                    style="background-color: #006d32; color: white"
                  >
                    Ajukan Permohonan
                  </span>
                </RouterLink>
              </div>
            </template>
          </BaseBlock>
        </div>
      </div>
    </BaseBlock>
  </div>
</template>
