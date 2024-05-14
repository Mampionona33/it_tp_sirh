import { DataOmsiProps } from '@src/interfaces/interfaceBtnDownloadOmsi'
import omsiService from '@src/services/omsiService'
import { useMutation } from '@tanstack/react-query'

const useAddDeclarationOmsie = () => {
  const { isIdle, isSuccess, isError, error, data, mutate, isPending } = useMutation({
    mutationKey: ['addDeclarationOmsie'],
    mutationFn: (declarationOmsieData: DataOmsiProps) =>
      omsiService.add({ ...declarationOmsieData }),
  })

  const addDeclarationOmsie = async (declarationOmsieData: DataOmsiProps) => {
    await mutate(declarationOmsieData)
  }

  return { isIdle, isSuccess, isError, error, data, mutate, isPending, addDeclarationOmsie }
}

export default useAddDeclarationOmsie
