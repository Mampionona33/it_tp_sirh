import SelectFloatingLable from '@src/components/Inputs/SelectFloatingLable'
import React from 'react'
import { Controller, useController, useForm } from 'react-hook-form'

const PageOmsi = () => {
  const periode = ['t1', 't2', 't3', 't4'].map((item) => {
    return {
      value: item,
      label: item,
    }
  })

  const currentYear = new Date().getFullYear()
  const anneOptions = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => ({
    value: currentYear - index,
    label: (currentYear - index).toString(),
  }))

  const { handleSubmit, control, getValues, reset } = useForm()
  const handlePeriodeChange = (value: string, type: string) => {}

  const {
    field: { value: selectedPeriode, onChange: onChangePeriode },
  } = useController({
    name: 'periode',
    control,
    defaultValue: 't1',
  })

  return (
    <div className="flex flex-col">
      <div className="flex mt-3">
        <div className="flex flex-col shadow-sm bg-white">
          <h3 className="bg-customRed-900 text-white text-lg px-4 py-2 capitalize rounded-t-sm">
            OMSI
          </h3>
          <form action="" method="post">
            <div className="w-full flex px-4 pb-4 justify-between-gap-2">
              <div className="w-full">
                <Controller
                  name="periode"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value, ref, ...rest },
                    fieldState: { error },
                  }) => {
                    return (
                      <div className="w-full min-w-[8rem]">
                        <SelectFloatingLable
                          className="w-full capitalize"
                          label="Période"
                          placeholder="Période"
                          {...rest}
                          options={periode}
                          value={value ? value : selectedPeriode}
                          onChange={(e) => handlePeriodeChange(e as string, 'select-option')}
                        />
                        {error && <span className="text-red-500 text-sm">{error.message}</span>}
                      </div>
                    )
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PageOmsi
