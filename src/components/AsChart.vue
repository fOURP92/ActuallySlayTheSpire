<template>
  <canvas id="chart" width="300" height="500"> </canvas>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue';

const props = defineProps<{
  options: echarts.EChartsOption;
}>();

onMounted(() => {
  const chartDom = document.getElementById('chart');
  const myChart = echarts.init(chartDom);

  myChart.setOption(props.options);
});
</script>
