<template>
  <DHeader />
  <DMain />
</template>

<script setup>
import DHeader from '@/view/header/DHeader.vue';
import DMain from '@/view/main/DMain.vue';
import { get100Vh } from '@/utils/device.js';

document.body.style.setProperty('--vh', get100Vh());
</script>
