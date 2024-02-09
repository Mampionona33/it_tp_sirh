import { useMutation } from '@tanstack/react-query'
import dnsService from '@src/services/DnsService'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'

const useAddEmployeDns = () => {
  const { isIdle, isSuccess, isError, error, data, mutate, isPending } = useMutation({
    mutationKey: ['addEmployeeDns'],
    mutationFn: (employeeData: IBulletinDePaieProps) => dnsService.add({ data: employeeData }),
  })

  const addEmployeeDns = async (employeeData: IBulletinDePaieProps) => {
    await mutate(employeeData)
  }

  return { isIdle, isSuccess, isError, error, data, mutate, isPending, addEmployeeDns }
}

export default useAddEmployeDns
