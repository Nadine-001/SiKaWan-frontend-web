<script setup>
import { ref, watch, onMounted } from "vue";
import { useTemplateStore } from "@/stores/template";

import BaseNavigation from "@/components/BaseNavigation.vue";

import SimpleBar from "simplebar";

import menu from "@/data/menu";

const navigation = menu.main;

// Component properties
defineProps({
  withMiniNav: {
    type: Boolean,
    default: false,
    description: "If the sidebar is in Mini Nav Mode",
  },
});

// Main store
const store = useTemplateStore();

// Dark Mode preference helper for radios
const radioDarkMode = ref();

// Sets default dark mode preferences for radios
function setDarkModeRadioDefault() {
  if (store.settings.darkModeSystem) {
    radioDarkMode.value = "system";
  } else {
    if (store.settings.darkMode) {
      radioDarkMode.value = "dark";
    } else {
      radioDarkMode.value = "light";
    }
  }
}

// When the user sets dark mode preference through the radios
function onDarkModeRadioChange() {
  if (radioDarkMode.value === "system") {
    store.darkModeSystem({ mode: "on" });
  } else {
    store.darkModeSystem({ mode: "off" });

    if (radioDarkMode.value === "dark") {
      store.darkMode({ mode: "on" });
    } else {
      store.darkMode({ mode: "off" });
    }
  }
}

// Set dark mode preference radios default and watch for changes to store
setDarkModeRadioDefault();
watch(
  () => store.settings.darkModeSystem,
  () => {
    setDarkModeRadioDefault();
  }
);
watch(
  () => store.settings.darkMode,
  () => {
    setDarkModeRadioDefault();
  }
);

// Init SimpleBar (custom scrolling)
onMounted(() => {
  new SimpleBar(document.getElementById("simplebar-sidebar"));
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Paytone+One:wght@400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Ramabhadra:wght@400&display=swap");

.sikawan-h1 {
  font-family: "Paytone One", sans-serif;
  font-weight: bold;
  font-size: 35px;
}

.masuk-h1 {
  font-family: "Ramabhadra", sans-serif;
  font-weight: normal;
  font-size: 50px;
}
</style>
<template>
  <nav
    id="sidebar"
    :class="{ 'with-mini-nav': withMiniNav }"
    aria-label="Main Navigation"
  >
    <slot>
      <!-- Side Header -->
      <div
        class="content-header"
        style="
          display: flex;
          align-items: center;
          background-color: #d9d9d9;
          color: #000000;
          padding: 10px;
        "
      >
        <div class="row items-push">
          <slot name="header">
            <div class="col-md-4">
              <!-- <h2 style="margin: 0; margin-left: 5px">IROPIN</h2> -->
              <h1 style="margin: 0; margin-left: 5px" class="sikawan-h1">
                <span style="color: #004b93">Si</span>
                <span style="color: #c9002b">KaWan</span>
              </h1>
            </div>
          </slot>
        </div>
      </div>

      <div
        id="simplebar-sidebar"
        class="js-sidebar-scroll"
        style="background-color: #d9d9d9; color: #000000"
      >
        <slot name="content">
          <!-- Side Navigation -->
          <div
            class="content-side"
            style="background-color: #d9d9d9; color: #000000"
          >
            <BaseNavigation :nodes="navigation" />
          </div>
          <!-- END Side Navigation -->
        </slot>
      </div>
      <!-- END Sidebar Scrolling -->
    </slot>
  </nav>
  <!-- END Sidebar -->
</template>
