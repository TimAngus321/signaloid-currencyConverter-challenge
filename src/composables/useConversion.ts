import { ref, computed } from 'vue'
// import { useSignaloidAPIStore } from '../stores/signaloidAPI'
import { useSigAPIComposable } from '@/composables/useSignaloidAPICalls'

export function useConversion() {
  //   const sigAPI = useSignaloidAPIStore()
  const { prepCreateTask } = useSigAPIComposable()

  const model = ref<boolean>(false)
  const amount = ref<number | null>(null)
  const minValue = ref<number | null>(null)
  const maxValue = ref<number | null>(null)
  const currency = computed<string>(() => (model.value ? 'EUR' : 'GBP'))
  const minMaxValue = computed<string>(() => (model.value ? 'GBP' : 'EUR'))

  // Validation for the values
  const isMinValueValid = computed<boolean>(() => {
    return minValue.value !== null && (amount.value === null || minValue.value > amount.value)
  })

  const isMaxValueValid = computed<boolean>(() => {
    return maxValue.value !== null && (amount.value === null || maxValue.value > amount.value)
  })

  const isMinMaxValid = computed<boolean>(() => {
    return minValue.value !== null && maxValue.value !== null && maxValue.value > minValue.value
  })

  const isFormValid = computed<boolean>(() => {
    return isMinValueValid.value && isMaxValueValid.value && isMinMaxValid.value
  })

  const handleSubmit = () => {
    if (isFormValid.value) {
      console.log('Form is valid:', {
        amount: amount.value,
        minValue: minValue.value,
        maxValue: maxValue.value
      })
      prepCreateTask(amount.value, minValue.value, maxValue.value)
    } else {
      console.log('Form is invalid.')
    }
  }

  return {
    model,
    amount,
    minValue,
    maxValue,
    currency,
    minMaxValue,
    isMinValueValid,
    isMaxValueValid,
    isMinMaxValid,
    isFormValid,
    handleSubmit
  }
}
