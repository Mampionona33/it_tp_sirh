import { DeclarationIrsaProps } from '@src/interfaces/interfaceDeclarationIrsa'
import irsaService from '@src/services/IrsaService'
import { useMutation } from '@tanstack/react-query'

const useAddDeclarationIrsa = () => {
  const { isIdle, isSuccess, isError, error, data, mutate, isPending } = useMutation({
    mutationKey: ['addDeclarationIrsa'],
    mutationFn: (declarationIrsaData: DeclarationIrsaProps) => irsaService.add(declarationIrsaData),
  })

  const addDeclarationIrsa = async (declarationIrsaData: DeclarationIrsaProps) => {
    await mutate(declarationIrsaData)
  }

  return { isIdle, isSuccess, isError, error, data, mutate, isPending, addDeclarationIrsa }
}

export default useAddDeclarationIrsa
