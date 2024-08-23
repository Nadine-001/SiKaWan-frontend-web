<script setup></script>

<template>
  <div class="content">
    <h2>Halo Talitha!</h2>
    <div class="row">
      <div class="col-md-2">
        <RouterLink :to="{ name: 'backend-component-tambahakun' }">
          <span
            class="btn btn-secondary px-4"
            style="background-color: #006d32; color: white"
          >
            Tambah Akun
          </span>
        </RouterLink>
      </div>
    </div>

    <BaseBlock title="" style="background-color: #edfcf0">
      <div class="row items-push">
        <div class="row">
          <div class="col-md-12">
            <h3 style="color: #006d32">TABEL KELOLA AKUN</h3>
          </div>
        </div>
      </div>
    </BaseBlock>
  </div>
</template>
