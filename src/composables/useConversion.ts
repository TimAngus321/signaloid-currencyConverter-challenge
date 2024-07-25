import { ref, computed } from 'vue'

export function useConversion() {
  const model = ref<boolean>(false)
  const amount = ref<number | null>(null)
  const minValue = ref<number | null>(null)
  const maxValue = ref<number | null>(null)
  const currency = computed<string>(() => (model.value ? 'EUR' : 'GBP'))
  // Prob better way to handle this come back later
  const minMaxValue = computed<string>(() => (model.value ? 'GBP' : 'EUR'))

  return {
    model,
    amount,
    minValue,
    maxValue,
    currency,
    minMaxValue
  }
}
