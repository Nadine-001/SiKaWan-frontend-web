<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import Dropzone from "dropzone";

const dropzone = ref(null);

onMounted(() => {
  dropzone.value = new Dropzone("#dropzoneForm", {
    url: "https://httpbin.org/post",
  });

  dropzone.value.on("addedfile", (file) => {
    console.log(`File added: ${file.name}`);
  });
});

onBeforeUnmount(() => {
  dropzone.value.destroy();
});
</script>

<style lang="scss">
@import "dropzone/dist/dropzone.css";
@import "@/assets/scss/vendor/dropzone";
</style>

<template>
  <div class="content">
    <BaseBlock title="" style="background-color: #edfcf0" class="col-md-4">
      <div class="row items-push">
        <div class="row">
          <div class="col-md-12">
            <h3 style="color: #006d32">Upload Bukti Pembayaran</h3>
            <div class="col-md-12">
              <form id="dropzoneForm" class="dropzone"></form>
            </div>
            <div class="mt-2">
              <button type="button" class="btn btn-success">Kirim</button>
              <div class="mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </BaseBlock>
  </div>
</template>
