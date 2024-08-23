<script setup>
// Grab example data
import users from "@/data/users";
</script>

<template>
  <div class="content" style="background-color: #edfcf0">
    <h2>Halo Talitha!</h2>
    <div class="col-md-12"></div>
    <BaseBlock style="margin-top: 20px">
      <div class="row items-push">
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-6">
              <h3 style="color: #006d32">FRAME</h3>
              <h2 class="content-heading">User List</h2>
              <div class="row items-push">
                <div class="col-xl-6">
                  <BaseBlock title="Spacy" class="h-100 mb-0">
                    <ul class="nav-items push">
                      <li
                        v-for="(user, index) in users.slice(0, 4)"
                        :key="`userlist-spacy-${index}`"
                      >
                        <a class="d-flex py-3" :href="`${user.href}`">
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
                            <div class="text-muted">
                              {{ user.profession }}
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </BaseBlock>
                </div>
                <div class="col-xl-6">
                  <BaseBlock title="Minimal" class="h-100 mb-0">
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
                            <div class="text-muted">
                              {{ user.profession }}
                            </div>
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
