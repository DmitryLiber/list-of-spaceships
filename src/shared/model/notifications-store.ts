import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { INotificationMsg } from '@/shared/model'
import { generateRandomValue } from '@/shared/utils'

const useNotificationsStore = defineStore('notifications', () => {
  const msgList = ref<INotificationMsg[]>([])

  function notification({ text = '', status = 'success' } = {} as INotificationMsg) {
    const idMsg = generateRandomValue()
    msgList.value.push({ text, status, id: idMsg })

    setTimeout(() => {
      msgList.value.splice(
        msgList.value.findIndex((msg) => msg.id === idMsg),
        1
      )
    }, 4000)
  }

  return { notification, msgList }
})

export default useNotificationsStore
