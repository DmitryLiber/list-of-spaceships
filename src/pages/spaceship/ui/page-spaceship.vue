<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { watch, ref, onMounted, computed } from 'vue'
import { get } from '@/shared/api'
import type { ISpaceship } from '@/shared/model'

const router = useRouter()
const route = useRoute()
const isLoadingSpaceships = ref(true)
const spaceship = ref({} as ISpaceship)

const backPage = () => {
  if (router.go(-1) !== undefined) return
  router.push('/')
}

const checkUnknownSpaceship = (value: string | undefined | number) => {
  if (value === 'unknown') return 'неизвестно'
  return value
}

onMounted(() => {
  const idSpaceship = route.params.spaceshipId

  const nextSuccess = (response: ISpaceship) => {
    spaceship.value = response
  }

  get({
    params: `/api/starships/${idSpaceship}`,
    nextSuccess,
    nextFinally: () => (isLoadingSpaceships.value = false)
  })
})
</script>

<template>
  <btn
    mods="icon-prepend, outline-ghost"
    style="--icon: url('/images/i-arrow-left.svg')"
    @click="backPage()"
    class="mb-l"
    >Список кораблей</btn
  >
  <loader
    v-if="isLoadingSpaceships"
    mods="center"
    size="40px"
    color="var(--color-surface-secondary)"
  />
  <slot v-else>
    <typography tag="h1" mods="heading1" class="pb-m"
      >Космический корабль - {{ spaceship.name }}</typography
    >
    <dl class="spaceship-specs">
      <div class="spaceship-specs__item">
        <dt class="spaceship-specs__item-key">Модель:</dt>
        <dd class="spaceship-specs__item-value">{{ checkUnknownSpaceship(spaceship.model) }}</dd>
      </div>

      <div class="spaceship-specs__item">
        <dt class="spaceship-specs__item-key">Производитель:</dt>
        <dd class="spaceship-specs__item-value">
          {{ checkUnknownSpaceship(spaceship.manufacturer) }}
        </dd>
      </div>

      <div class="spaceship-specs__item">
        <dt class="spaceship-specs__item-key">Цена в кредит:</dt>
        <dd class="spaceship-specs__item-value">
          {{ checkUnknownSpaceship(spaceship.cost_in_credits) }}
        </dd>
      </div>

      <div class="spaceship-specs__item">
        <dt class="spaceship-specs__item-key">Длина:</dt>
        <dd class="spaceship-specs__item-value">{{ checkUnknownSpaceship(spaceship.length) }}</dd>
      </div>

      <div class="spaceship-specs__item">
        <dt class="spaceship-specs__item-key">Максимальная атмосферная скорость:</dt>
        <dd class="spaceship-specs__item-value">
          {{ checkUnknownSpaceship(spaceship.max_atmosphering_speed) }}
        </dd>
      </div>

      <div class="spaceship-specs__item">
        <dt class="spaceship-specs__item-key">Экипаж:</dt>
        <dd class="spaceship-specs__item-value">{{ checkUnknownSpaceship(spaceship.crew) }}</dd>
      </div>

      <div class="spaceship-specs__item">
        <dt class="spaceship-specs__item-key">Пассажиров:</dt>
        <dd class="spaceship-specs__item-value">
          {{ checkUnknownSpaceship(spaceship.passengers) }}
        </dd>
      </div>

      <div class="spaceship-specs__item">
        <dt class="spaceship-specs__item-key">Грузоподъемность:</dt>
        <dd class="spaceship-specs__item-value">
          {{ checkUnknownSpaceship(spaceship.cargo_capacity) }}
        </dd>
      </div>

      <div class="spaceship-specs__item">
        <dt class="spaceship-specs__item-key">Расходные материалы:</dt>
        <dd class="spaceship-specs__item-value">
          {{ checkUnknownSpaceship(spaceship.consumables) }}
        </dd>
      </div>

      <div class="spaceship-specs__item">
        <dt class="spaceship-specs__item-key">Рейтинг гипердвигателя:</dt>
        <dd class="spaceship-specs__item-value">
          {{ checkUnknownSpaceship(spaceship.hyperdrive_rating) }}
        </dd>
      </div>

      <div class="spaceship-specs__item">
        <dt class="spaceship-specs__item-key">MGLT:</dt>
        <dd class="spaceship-specs__item-value">{{ checkUnknownSpaceship(spaceship.MGLT) }}</dd>
      </div>

      <div class="spaceship-specs__item">
        <dt class="spaceship-specs__item-key">Класс корабля:</dt>
        <dd class="spaceship-specs__item-value">
          {{ checkUnknownSpaceship(spaceship.starship_class) }}
        </dd>
      </div>
    </dl>
  </slot>
</template>

<style lang="scss" scoped>
@layer block {
  .spaceship-specs {
    margin: 0;

    &__item {
      display: flex;
      &:not(:last-child) {
        margin-bottom: var(--gap-xs);
      }
    }

    &__item-key {
      font-weight: 700;
      margin-right: var(--gap-xxxs);
    }

    &__item-value {
      margin: 0;
    }
  }
}
</style>
