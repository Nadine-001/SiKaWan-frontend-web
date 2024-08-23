<script setup>
import users from "@/data/users";
</script>

<template>
  <div class="content">
    <BaseBlock title="">
      <div class="row items-push">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12">
              <h1 style="color: #006d32">Daftar Peserta</h1>
              <hr style="border: 2px solid #006d32" />
            </div>

            <div class="col-md-12">
              <div class="row">
                <div class="col-xl-4">
                  <BaseBlock title="" class="h-100 mb-0">
                    <ul class="nav-items push">
                      <li
                        v-for="(user, index) in users"
                        :key="`userlist-minimal-${index}`"
                      >
                        <a class="d-flex py-2" :href="`${user.href}`">
                          <div
                            class="me-3 ms-2 overlay-container overlay-bottom"
                          >
                            <img
                              class="img-avatar img-avatar48"
                              :src="`/assets/media/avatars/${user.avatar}.jpg`"
                              alt="User Photo"
                            />
                            <span
                              :class="`overlay-item item item-tiny item-circle border border-2 border-white bg-${user.statusColor}`"
                            ></span>
                          </div>
                          <div class="flex-grow-1 fs-sm">
                            <div class="fw-semibold">{{ user.name }}</div>
                            <div class="text-muted">{{ user.profession }}</div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </BaseBlock>
                </div>
                <div class="col-xl-4">
                  <BaseBlock title="" class="h-100 mb-0">
                    <ul class="nav-items push">
                      <li
                        v-for="(user, index) in users"
                        :key="`userlist-minimal-${index}`"
                      >
                        <a class="d-flex py-2" :href="`${user.href}`">
                          <div
                            class="me-3 ms-2 overlay-container overlay-bottom"
                          >
                            <img
                              class="img-avatar img-avatar48"
                              :src="`/assets/media/avatars/${user.avatar}.jpg`"
                              alt="User Photo"
                            />
                            <span
                              :class="`overlay-item item item-tiny item-circle border border-2 border-white bg-${user.statusColor}`"
                            ></span>
                          </div>
                          <div class="flex-grow-1 fs-sm">
                            <div class="fw-semibold">{{ user.name }}</div>
                            <div class="text-muted">{{ user.profession }}</div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </BaseBlock>
                </div>
                <div class="col-xl-4">
                  <BaseBlock title="" class="h-100 mb-0">
                    <ul class="nav-items push">
                      <li
                        v-for="(user, index) in users"
                        :key="`userlist-minimal-${index}`"
                      >
                        <a class="d-flex py-2" :href="`${user.href}`">
                          <div
                            class="me-3 ms-2 overlay-container overlay-bottom"
                          >
                            <img
                              class="img-avatar img-avatar48"
                              :src="`/assets/media/avatars/${user.avatar}.jpg`"
                              alt="User Photo"
                            />
                            <span
                              :class="`overlay-item item item-tiny item-circle border border-2 border-white bg-${user.statusColor}`"
                            ></span>
                          </div>
                          <div class="flex-grow-1 fs-sm">
                            <div class="fw-semibold">{{ user.name }}</div>
                            <div class="text-muted">{{ user.profession }}</div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </BaseBlock>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseBlock>
  </div>
</template>
