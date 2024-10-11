<script lang="ts" setup>
import { modifiersJoin } from '@/shared/utils'

interface Props {
  mods?: string
  required?: boolean
  placeholder?: string
  value?: string | number | null
  type?: 'text' | 'email' | 'password' | 'number'
  icon?: string
}

const {
  mods = '',
  required = false,
  placeholder,
  value = null,
  type = 'text',
  icon = ''
} = defineProps<Props>()
</script>

<template>
  <div :class="['field', modifiersJoin(mods, 'field')]" :style="`--icon: url(/images/${icon})`">
    <input
      class="field__input"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      :value="value"
    />
  </div>
</template>

<style lang="scss" scoped>
@layer block {
  .field {
    width: 100%;

    &__input {
      @include font(16px, 1.37);

      color: cl(text, 0.8);
      border-radius: var(--radius-xs);
      padding: 9px 16px;
      width: 100%;
      border: 1px solid cl(surface-alt);

      outline: none;
      transition:
        border $time,
        color $time,
        box-shadow;

      &::placeholder {
        color: cl(bg-secondary);
      }
    }
  }
}

@layer mod {
  .field--icon-append {
    display: flex;
    align-items: center;
    gap: 16px;
    color: cl(text, 0.45);
    position: relative;

    &::after {
      @include variable-icon(var(--icon), 24px, currentColor);
      flex-shrink: 0;
      position: absolute;
      right: 16px;
      pointer-events: none;
    }
  }
}

@layer state {
  .field {
    &__input {
      &:focus {
        color: cl(text);
        border: 1px solid cl(surface-third);
        box-shadow: 0 0 0 2px rgba(76, 111, 255, 0.3);
      }
    }
  }
}
</style>
