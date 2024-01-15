import { UserMinusIcon } from '@heroicons/react/24/outline'
import Loading from '@src/components/Loading'
import ButtonWithIcon, { ButtonWithIconVariant } from '@src/components/buttons/ButtonWithIcon'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { EnumBoolean, IEmploye } from '@src/interfaces/interfaceEmploye'
import { deleteEmployee } from '@src/redux/employees/employeesAction'
import { setModalClose } from '@src/redux/modal/modalReducer'
import { format } from 'date-fns'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface IModalValidResiliation {
  motif: string
}

const ModalValidResiliation: React.FC<IModalValidResiliation> = ({ motif }) => {
  const { loading: loadingListEmployee } = useAppSelector((store) => store.employeesList)
  const formEmploye = useAppSelector((store) => store.formEmploye)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleCancel = () => {
    dispatch(setModalClose())
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const dataToPost: IEmploye = {
      ...formEmploye,
      actif: EnumBoolean.NON,
      depart: {
        date: format(new Date(), 'yyyy-MM-dd'),
        motif: motif,
      },
    }

    try {
      // const response = await employeService.delete(formEmploye.id, dataToPost)
      const response = await dispatch(deleteEmployee({ id: formEmploye.id, data: dataToPost }))
      if (response.meta.requestStatus === 'fulfilled') {
        dispatch(setModalClose())
        console.log(response)
        navigate('/employees/list')
      }
    } catch (error) {
      console.error(error)
      dispatch(setModalClose())
    }
  }

  if (loadingListEmployee === 'pending') return <Loading />

  return (
    <div className="flex justify-center bg-white p-4">
      <form onSubmit={handleSubmit}>
        <p>Veuillez confirmer la résiliation</p>
        <div className="flex justify-between items-center gap-2">
          <ButtonWithIcon
            variant={ButtonWithIconVariant.Secondary}
            icon={<UserMinusIcon className="w-6 h-6" />}
            label="Confirmer la résiliation"
            type="submit"
          />
          <ButtonWithIcon onClick={handleCancel} label="Annuler" type="button" />
        </div>
      </form>
    </div>
  )
}

export default ModalValidResiliation
