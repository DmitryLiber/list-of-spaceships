<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  currentPage: number
  countPages: number
  onPrevPage: () => void
  onNextPage: () => void
}

const { currentPage, countPages, onPrevPage, onNextPage } = defineProps<Props>()
</script>

<template>
  <ul class="pagination">
    <li class="pagination__item">
      <button class="pagination__prev" @click="onPrevPage()" :disabled="currentPage === 1"></button>
    </li>
    <li class="pagination__item">
      <btn mods="outline-ghost, small" class="pagination__link-current">{{ currentPage }}</btn>
    </li>
    <li class="pagination__separator">of</li>
    <li class="pagination__item">
      <btn mods="outline-ghost, small" class="pagination__link-future">{{ countPages }}</btn>
    </li>
    <li class="pagination__item">
      <button
        class="pagination__next"
        @click="onNextPage()"
        :disabled="currentPage === countPages"
      ></button>
    </li>
  </ul>
</template>

<style lang="scss">
@layer block {
  .pagination {
    @include reset-list();
    @include center;

    gap: 12px;
    margin-top: var(--gap-l);

    &__prev,
    &__next {
      --color: #{cl(text, 0.45)};

      @include mq-hover() {
        --color: #{cl(text)};
      }
    }

    &__prev {
      @include variable-icon(url('/images/i-arrow-left.svg'), 24px, var(--color));
    }

    &__next {
      @include variable-icon(url('/images/i-arrow-right.svg'), 24px, var(--color));

      color: cl(text, 0.45);
    }

    &__separator {
      @include font(13px, 1.85);

      color: cl(text, 0.8);
    }

    &__link-current,
    &__link-future {
      pointer-events: none;
    }
  }
}

@layer state {
  .pagination {
    &__prev,
    &__next {
      &:disabled {
        pointer-events: none;
        cursor: crosshair;
      }
    }
  }
}
</style>
