<script lang="ts" setup>
import { modifiersJoin } from '@/shared/utils'

interface Props {
  mods?: string
  tag?: string
}

const { mods = '', tag } = defineProps<Props>()
</script>

<template>
  <component :is="tag ? tag : 'article'" :class="['card', modifiersJoin(mods, 'card')]">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@layer block {
  .card {
    @include center;

    border-radius: var(--gap-s);
    background-color: cl(surface);
    padding: var(--gap-xl) var(--gap-s);
    transition: background-color $time;
    font-weight: 500;

    @include mq-hover() {
      background-color: cl(surface-alt);
    }
  }
}
</style>
