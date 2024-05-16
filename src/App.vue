<template>
  <TabsWrapper>
    <Tab title="Список">
      <ListTab />
    </Tab>
    <Tab title="Карта">
      <MapTab />
    </Tab>
    <Tab title="Настройки">
      <SettingsTab />
    </Tab>
  </TabsWrapper>
</template>



<script setup>
import TabsWrapper from './components/TabsWrapper.vue'
import Tab from './components/Tab.vue'
import ListTab from './components/ListTab.vue';
import SettingsTab from './components/SettingsTab.vue';
import MapTab from './components/MapTab.vue';


</script>

<style scoped>


</style>
