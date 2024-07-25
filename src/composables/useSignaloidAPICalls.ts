// Clean up pinia store by adding functions here and using them in the store
// Use Pinia for state stuff and this for logic

import axios from 'axios'
import { useSignaloidAPIStore } from '../stores/signaloidAPI'

type SourceCodeTaskRequest = {
  Type: 'SourceCode'
  SourceCode: {
    Object: 'SourceCode'
    Code: string
    Arguments: string
    Language: 'C' | 'C++'
  }
  Overrides?: {
    Core?: string
  }
}

export const useSigAPIComposable = () => {
  const sigAPI = useSignaloidAPIStore()

  const coreID = 'cor_b21e4de9927158c1a5b603c2affb8a09'

  const prepCreateTask = (
    amount: number | null,
    minValue: number | null,
    maxValue: number | null
  ) => {
    const CProgramToRun = `#include <stdio.h>
#include <stdlib.h>
#include <uxhw.h>

int main(int argc, char *argv[])
{
    if (argc < 2) {
        fprintf(stderr, "Usage: %s <${amount}>\\n", argv[0]);
        return 1;
    }

    double amountVal = atof(argv[1]);
    double a, b, c;

    a = UxHwDoubleUniformDist(0, ${amount});
    printf("a = %lf\\n", a);

    b = UxHwDoubleUniformDist(${minValue}, ${maxValue});
    printf("b = %lf\\n", b);

    c = (a + b) / (a - b);
    printf("c = %lf\\n", c);

#ifdef DEBUG
    printf("debug message\\n");
#endif

    return 0;
}`

    const taskRequest: SourceCodeTaskRequest = {
      Type: 'SourceCode',
      SourceCode: {
        Object: 'SourceCode',
        Code: CProgramToRun,
        Arguments: '',
        Language: 'C'
      },
      Overrides: {
        Core: coreID
      }
    }

    sigAPI.createTask(taskRequest)
  }

  return {
    prepCreateTask
  }
}
