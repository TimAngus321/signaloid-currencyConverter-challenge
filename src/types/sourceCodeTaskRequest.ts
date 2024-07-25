export type SourceCodeTaskRequest = {
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
