<!-- 代辦清單 -->
<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
const schedules = ref([]);
const error = ref('');
const loading = ref(true);

// 車站代碼（台北=1008，台中=1025）
const origin = '1000';
const destination = '1020';
const date = '2025-04-30';
const timeStart = '08:00';
const timeEnd = '12:00';

const fetchTimetable = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get(
      `https://tdx.transportdata.tw/api/basic/v3/Rail/TRA/DailyTrainTimetable/OD/${origin}/to/${destination}/${date}?%24top=30&%24format=JSON`,
      {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`
        // },
        // params: {
        //   $filter: `OriginStopTime/DepartureTime ge '${timeStart}' and OriginStopTime/DepartureTime le '${timeEnd}'`
        // }
      }
    );
    schedules.value = response.data.TrainTimetables;
    console.log(response.data);
  } catch (err) {
    error.value = '查詢失敗：' + err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchTimetable);

</script>

<template>
  <ul v-if="schedules.length">
    <li v-for="train in schedules" :key="train.TrainNo">
      {{ train.TrainInfo.TrainNo }} 車次｜{{ train.StopTimes[0].DepartureTime }} 出發 → {{ train.StopTimes[1].ArrivalTime }}
      抵達｜{{
        train.TrainInfo.TrainTypeName.Zh_tw }}
    </li>
  </ul>
</template>
