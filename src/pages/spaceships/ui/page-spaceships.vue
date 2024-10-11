<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useSpaceshipsStore } from '@/entities/spaceship'
import { pagination } from '@/shared/ui'
import { debounce } from '@/shared/utils'
import type Typography from '@/shared/ui/typography.vue'

const spaceshipsStore = useSpaceshipsStore()
const route = useRoute()
const router = useRouter()

const searchSpaceships = debounce((nameSpaceshipSearch: string) => {
  spaceshipsStore.setSearchValue(nameSpaceshipSearch)
  onUpdateUrl()
}, 1000)

const onUpdateUrl = () => {
  router.push({
    path: '/',
    query: { q: spaceshipsStore.searchValue, page: spaceshipsStore.currentPage }
  })
}

onMounted(() => {
  const { q, page } = route.query

  if (page) spaceshipsStore.setCurrentPage(+page as number)
  if (q) spaceshipsStore.setSearchValue(q as string, false)

  spaceshipsStore.get()
})
</script>

<template>
  <typography tag="h1" mods="heading1" class="pb-m"
    >Космические корабли ({{ spaceshipsStore.countSpaceships }})</typography
  >

  <field
    placeholder="Найти корабль по названию"
    mods="icon-append"
    icon="i-zoom.svg"
    class="pb-s"
    :value="spaceshipsStore.searchValue"
    @input="(event: InputEvent) => searchSpaceships((event.target as HTMLInputElement).value)"
  />

  <loader
    v-if="spaceshipsStore.isSearching"
    mods="center"
    size="40px"
    color="var(--color-surface-secondary)"
  />
  <typography
    v-else-if="spaceshipsStore.spaceships.length === 0"
    tag="h2"
    mods="heading2"
    class="pb-m"
    >Ничего не найдено</typography
  >
  <slot v-else>
    <grid>
      <card
        v-for="spaceship in spaceshipsStore.spaceships"
        :key="spaceship.name"
        :href="`/spaceship/${spaceship.url.split('/')[5]}`"
        tag="a"
        mods="center"
      >
        {{ spaceship.name }}
      </card>
    </grid>
    <pagination
      :currentPage="spaceshipsStore.currentPage"
      :countPages="spaceshipsStore.countPages"
      :count="spaceshipsStore.countSpaceships"
      :onPrevPage="
        () => {
          spaceshipsStore.prevPage()
          onUpdateUrl()
        }
      "
      :onNextPage="
        () => {
          spaceshipsStore.nextPage()
          onUpdateUrl()
        }
      "
    />
  </slot>
</template>
