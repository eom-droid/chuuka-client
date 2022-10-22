<template>
  <nav class="w-page-sm bg-white text-black w-full">
    <div class="flex justify-center relative">
      <img src="@/assets/img/logo/logo_firework_black.svg" class="w-1/5 my-2" />
      <div class="flex absolute right-3 h-full">
        <router-link to="/search" class="mr-2 w-7 my-auto">
          <img src="@/assets/img/icon/search.svg" class="" />
        </router-link>
        <router-link to="/search" class="mr-2 w-7 my-auto">
          <img src="@/assets/img/icon/shoppingCart.svg" class="" />
        </router-link>
      </div>
    </div>

    <!-- <div
      class="w-page-sm px-4 grid grid-cols-3 grid-flow-col gap-4 items-center h-full w-full"
    >
      
      <router-link to="/home" class="flex items-center m-auto title text-2xl">
        <img src="@/assets/img/logo/logoWithFirework.svg"/>
      </router-link>
      <div class="mr-4 flex gap-5 justify-end">
        <router-link to="/search" class="">
          <div><font-awesome-icon icon="search" /></div>
        </router-link>
        <router-link to="/heart" class="">
          <div><font-awesome-icon icon="shopping-bag" /></div>
        </router-link>
      </div>
    </div> -->
  </nav>
</template>

<script setup lang="ts"></script>

<style></style>
