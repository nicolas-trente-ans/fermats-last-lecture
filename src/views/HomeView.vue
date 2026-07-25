<script setup lang="ts">
import { useAppData, useLocale } from '@/composables'
import SectionList from '@/components/SectionList.vue'

const data = useAppData()
const { t } = useLocale()
</script>

<template>
  <div>
    <h1 class="page-title">{{ t('title') }}</h1>
    <p class="lede">{{ t('ui.home_lede') }}</p>
    <SectionList :sections="data.sections" />
  </div>
</template>
