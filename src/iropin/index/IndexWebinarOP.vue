<script setup>
import { reactive, computed, onMounted, ref } from "vue";

import { useRouter } from "vue-router";
import {
  Dataset,
  DatasetItem,
  DatasetInfo,
  DatasetPager,
  DatasetSearch,
  DatasetShow,
} from "vue-dataset";
const router = useRouter();

import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

// Set Global Chart.js configuration
Chart.defaults.color = "#818d96";
Chart.defaults.scale.grid.lineWidth = 0;
Chart.defaults.scale.beginAtZero = true;
Chart.defaults.datasets.bar.maxBarThickness = 45;
Chart.defaults.elements.bar.borderRadius = 4;
Chart.defaults.elements.bar.borderSkipped = false;
Chart.defaults.elements.point.radius = 0;
Chart.defaults.elements.point.hoverRadius = 0;
Chart.defaults.plugins.tooltip.radius = 3;
Chart.defaults.plugins.legend.labels.boxWidth = 10;
</script>

<template>
  <div class="content">
    <h2>Halo Talitha!</h2>
    <div class="row">
      <div class="col-xl-3">
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">32/50</dt>
                <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                  Sosialisasi Covid-19
                </dd>
              </dl>
            </div>
            <div class="bg-body-light rounded-bottom">
              <a
                class="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)"
              >
                <span>Lihat Semua Peserta</span>
                <i
                  class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"
                ></i>
              </a>
            </div>
          </template>
        </BaseBlock>
      </div>
      <div class="col-xl-3">
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">32/50</dt>
                <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                  Sosialisasi Covid-19
                </dd>
              </dl>
              <!-- <div class="item item-rounded-lg bg-body-light">
              <i class="far fa-gem fs-3 text-primary"></i>
            </div> -->
            </div>
            <div class="bg-body-light rounded-bottom">
              <a
                class="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)"
              >
                <span>Lihat Semua Peserta</span>
                <i
                  class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"
                ></i>
              </a>
            </div>
          </template>
        </BaseBlock>
      </div>
      <div class="col-xl-3">
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">32/50</dt>
                <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                  Sosialisasi Covid-19
                </dd>
              </dl>
              <!-- <div class="item item-rounded-lg bg-body-light">
              <i class="far fa-gem fs-3 text-primary"></i>
            </div> -->
            </div>
            <div class="bg-body-light rounded-bottom">
              <a
                class="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)"
              >
                <span>Lihat Semua Peserta</span>
                <i
                  class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"
                ></i>
              </a>
            </div>
          </template>
        </BaseBlock>
      </div>
      <div class="col-xl-3">
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">32/50</dt>
                <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                  Sosialisasi Covid-19
                </dd>
              </dl>
              <!-- <div class="item item-rounded-lg bg-body-light">
              <i class="far fa-gem fs-3 text-primary"></i>
            </div> -->
            </div>
            <div class="bg-body-light rounded-bottom">
              <a
                class="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)"
              >
                <span>Lihat Semua Peserta</span>
                <i
                  class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"
                ></i>
              </a>
            </div>
          </template>
        </BaseBlock>
      </div>
    </div>

    <!-- Paragraphs in Grid -->

    <!-- <BaseBlock title="">
      <div class="row items-push">
        <div class="row">
            
          <div class="col-md-12">
            <h3 style="color: #006d32">Profil Page User Disini</h3>
            
          </div>
        </div>
      </div>
    </BaseBlock> -->
  </div>
</template>
