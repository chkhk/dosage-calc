<template>
  <div>
    <h1>剂量快速计算</h1>
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { get100Vh } from './utils/device';
import './style.css';

onBeforeMount(() => {
  document.body.style.setProperty('--vh', get100Vh());
});
</script>
