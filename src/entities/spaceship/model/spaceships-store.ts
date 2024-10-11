import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { getSpaceships } from '@/shared/api'
import { PER_PAGE_SPACESHIPS } from '@/shared/config'
import type { ISpaceship } from '@/shared/model'

const useSpaceshipsStore = defineStore('spaceships', () => {
  const spaceships = ref<ISpaceship[]>([])
  const searchValue = ref('')
  const currentPage = ref(1)
  const countSpaceships = ref(0)
  const countPages = computed(() => Math.ceil(countSpaceships.value / PER_PAGE_SPACESHIPS))
  const isSearching = ref(true)

  function get() {
    isSearching.value = true

    const nextSuccess = (res: any) => {
      const { results, count } = res
      spaceships.value = results
      countSpaceships.value = count
    }

    const nextFinally = () => {
      isSearching.value = false
    }

    getSpaceships({
      searchValue: searchValue.value,
      page: currentPage.value,
      nextSuccess,
      nextFinally
    })
  }

  function setSearchValue(text: string, hotReload = true) {
    searchValue.value = text

    if (!hotReload) return
    currentPage.value = 1
    get()
  }

  function setCurrentPage(number: number) {
    currentPage.value = number
  }

  function nextPage() {
    currentPage.value++
    get()
  }

  function prevPage() {
    currentPage.value--
    get()
  }

  return {
    spaceships,
    searchValue,
    currentPage,
    countPages,
    countSpaceships,
    isSearching,
    get,
    setSearchValue,
    setCurrentPage,
    nextPage,
    prevPage
  }
})

export default useSpaceshipsStore
